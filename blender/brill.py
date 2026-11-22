"""
Brill — the face of Brillianton — as a stylised 3D character.

Run headless:
  blender -b -P blender/brill.py -- <out_dir>

Outputs:
  <out_dir>/brill-3d.glb        animated-ready model (named parts for runtime animation)
  <out_dir>/brill-3d.png        hero render (transparent)
  <out_dir>/brill-3d-face.png   head close-up (for avatars)

Reference: the Brill photograph (short swept-up black hair, warm medium-brown skin,
white open-collar shirt, charcoal blazer, hands clasped in front, friendly smile).
Parts are separate named objects so three.js can animate them without a rig:
  Body, ArmL, ArmR, HeadPivot (empty) > Head, Hair, EyeL, EyeR, BrowL, BrowR, Mouth, Plinth
"""
import bpy, bmesh, math, os, sys
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = os.path.abspath(argv[0] if argv else os.path.join(os.path.dirname(__file__), "..", "public", "brand"))
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def srgb(hexstr):
    h = hexstr.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [(v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c]
    return (*lin, 1.0)

def mat(name, hexstr, rough=0.5, metal=0.0, sss=0.0, coat=0.0, emission=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = srgb(hexstr)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    for key in ("Subsurface Weight", "Subsurface"):
        if key in b.inputs:
            b.inputs[key].default_value = sss
            break
    for key in ("Coat Weight", "Clearcoat"):
        if key in b.inputs:
            b.inputs[key].default_value = coat
            break
    if emission:
        for key in ("Emission Color", "Emission"):
            if key in b.inputs:
                b.inputs[key].default_value = srgb(emission)
                break
        if "Emission Strength" in b.inputs:
            b.inputs["Emission Strength"].default_value = 1.5
    return m

M = {
    "skin": mat("Skin", "#B97F5A", rough=0.48, sss=0.12),
    "hair": mat("Hair", "#141210", rough=0.38, coat=0.2),
    "blazer": mat("Blazer", "#4A4D55", rough=0.82),
    "lapel": mat("Lapel", "#3C3F47", rough=0.75),
    "shirt": mat("Shirt", "#F4F5F7", rough=0.6),
    "trousers": mat("Trousers", "#2E3038", rough=0.8),
    "shoe": mat("Shoe", "#16171A", rough=0.3, coat=0.5),
    "eyeW": mat("EyeWhite", "#F7F5F0", rough=0.2),
    "iris": mat("Iris", "#2B1A10", rough=0.15, coat=1.0),
    "lip": mat("Lip", "#7A3B30", rough=0.5),
    "teeth": mat("Teeth", "#FBFAF6", rough=0.3),
    "brow": mat("Brow", "#17120E", rough=0.7),
    "plinth": mat("Plinth", "#1D3FE0", rough=0.35, coat=0.6),
    "sun": mat("Sun", "#FFD43B", rough=0.3, emission="#FFD43B"),
    "button": mat("Button", "#22242A", rough=0.3),
}

def smooth(obj, levels=2):
    for p in obj.data.polygons:
        p.use_smooth = True
    if levels:
        mod = obj.modifiers.new("Subsurf", "SUBSURF")
        mod.levels = levels
        mod.render_levels = levels
    return obj

def assign(obj, material):
    obj.data.materials.clear()
    obj.data.materials.append(material)
    return obj

def sphere(name, r, loc, scale=(1, 1, 1), material=None, seg=32, rings=16, sub=1):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc, segments=seg, ring_count=rings)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    if material:
        assign(o, material)
    return smooth(o, sub)

def cube(name, size, loc, material=None, sub=2, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(scale=True, rotation=True)
    if material:
        assign(o, material)
    return smooth(o, sub)

def limb(name, a, b, r1, r2, material, sub=1):
    """Tapered cylinder between points a and b."""
    a, b = Vector(a), Vector(b)
    d = b - a
    bpy.ops.mesh.primitive_cone_add(vertices=40, radius1=r1, radius2=r2, depth=d.length, location=(a + b) / 2)
    o = bpy.context.active_object
    o.name = name
    o.rotation_mode = "QUATERNION"
    o.rotation_quaternion = d.to_track_quat("Z", "Y")
    bpy.ops.object.transform_apply(rotation=True)
    assign(o, material)
    return smooth(o, sub)

def join(name, objs):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = bpy.context.active_object
    o.name = name
    return o

def edit_verts(obj, fn):
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    for v in bm.verts:
        fn(v.co)
    bm.to_mesh(obj.data)
    bm.free()
    obj.data.update()

def apply_mods(obj):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    for m in list(obj.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)

# The character faces -Y (towards the front camera). glTF export turns that into +Z.
FRONT = -1.0

# ---------------------------------------------------------------- plinth
bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=0.62, depth=0.12, location=(0, 0, -0.06))
plinth = assign(bpy.context.active_object, M["plinth"])
plinth.name = "PlinthBase"
smooth(plinth, 0)
bpy.ops.mesh.primitive_torus_add(major_radius=0.62, minor_radius=0.018, location=(0, 0, 0.0), major_segments=128, minor_segments=12)
ring = assign(bpy.context.active_object, M["sun"])
smooth(ring, 0)
plinth = join("Plinth", [plinth, ring])

# ---------------------------------------------------------------- legs & shoes
legL = limb("LegL", (-0.115, 0, 0.06), (-0.12, 0, 0.78), 0.095, 0.115, M["trousers"], sub=0)
legR = limb("LegR", (0.115, 0, 0.06), (0.12, 0, 0.78), 0.095, 0.115, M["trousers"], sub=0)
shoeL = sphere("ShoeL", 0.1, (-0.115, FRONT * 0.05, 0.045), scale=(0.95, 1.55, 0.55), material=M["shoe"])
shoeR = sphere("ShoeR", 0.1, (0.115, FRONT * 0.05, 0.045), scale=(0.95, 1.55, 0.55), material=M["shoe"])

# ---------------------------------------------------------------- torso (blazer)
torso = cube("Torso", (0.62, 0.34, 0.66), (0, 0, 1.06), material=M["blazer"], sub=0)
def shape_torso(co):
    t = (co.z - 0.73) / 0.66  # 0 at hem, 1 at shoulders
    w = 0.86 + 0.26 * max(0.0, t - 0.55) / 0.45 if t > 0.55 else 0.86 + 0.04 * (0.55 - t)
    co.x *= w
    if t > 0.92:
        co.z -= abs(co.x) * 0.18  # shoulder slope
    co.y *= 0.92 if t < 0.5 else 1.0
edit_verts(torso, shape_torso)
bpy.ops.object.select_all(action="DESELECT")
torso.select_set(True)
bpy.context.view_layer.objects.active = torso
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.mesh.subdivide(number_cuts=2)
bpy.ops.object.mode_set(mode="OBJECT")
smooth(torso, 2)
apply_mods(torso)
edit_verts(torso, shape_torso)  # second pass on the denser mesh keeps a tailored silhouette

# Shirt V and collar
def plate(name, pts2d, y, thick, material):
    bm = bmesh.new()
    top = [bm.verts.new((x, y, z)) for x, z in pts2d]
    bot = [bm.verts.new((x, y + thick, z)) for x, z in pts2d]
    bm.faces.new(top)
    bm.faces.new(list(reversed(bot)))
    n = len(pts2d)
    for i in range(n):
        bm.faces.new([top[i], top[(i + 1) % n], bot[(i + 1) % n], bot[i]])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    assign(o, material)
    for p in o.data.polygons:
        p.use_smooth = False
    return o

yf = FRONT * 0.165
shirt = plate("ShirtV", [(-0.13, 1.37), (0.13, 1.37), (0.0, 1.02)], yf - 0.008, 0.03, M["shirt"])
lapL = plate("LapelL", [(-0.135, 1.37), (-0.005, 1.02), (-0.05, 1.0), (-0.2, 1.3)], yf - 0.02, 0.02, M["lapel"])
lapR = plate("LapelR", [(0.135, 1.37), (0.005, 1.02), (0.05, 1.0), (0.2, 1.3)], yf - 0.02, 0.02, M["lapel"])
colL = plate("CollarL", [(-0.11, 1.45), (-0.025, 1.37), (-0.1, 1.32), (-0.16, 1.4)], yf - 0.03, 0.015, M["shirt"])
colR = plate("CollarR", [(0.11, 1.45), (0.025, 1.37), (0.1, 1.32), (0.16, 1.4)], yf - 0.03, 0.015, M["shirt"])
btn = sphere("Button", 0.018, (0, yf - 0.03, 0.96), scale=(1, 0.4, 1), material=M["button"], seg=16, rings=8, sub=0)

# Neck
neck = limb("Neck", (0, 0.0, 1.3), (0, -0.01, 1.5), 0.088, 0.082, M["skin"], sub=0)

body = join("Body", [torso, legL, legR, shoeL, shoeR, shirt, lapL, lapR, colL, colR, btn, neck])

# ---------------------------------------------------------------- arms (hands clasped in front)
def arm(side):
    s = 1 if side == "R" else -1
    shoulder = (s * 0.325, 0.0, 1.27)
    elbow = (s * 0.37, FRONT * 0.03, 0.98)
    wrist = (s * 0.1, FRONT * 0.22, 0.86)
    upper = limb(f"Upper{side}", shoulder, elbow, 0.09, 0.078, M["blazer"], sub=0)
    fore = limb(f"Fore{side}", elbow, wrist, 0.078, 0.066, M["blazer"], sub=0)
    shoulderball = sphere(f"Shoulder{side}", 0.083, (s * 0.315, 0.0, 1.265), material=M["blazer"], seg=32, rings=16)
    elbowball = sphere(f"Elbow{side}", 0.08, elbow, material=M["blazer"], seg=24, rings=12)
    cuff = limb(f"Cuff{side}", (s * 0.12, FRONT * 0.21, 0.865), (s * 0.08, FRONT * 0.235, 0.855), 0.058, 0.055, M["shirt"], sub=0)
    hand = sphere(f"Hand{side}", 0.068, (s * 0.04, FRONT * 0.255, 0.85), scale=(1.15, 0.8, 1.0), material=M["skin"])
    thumb = sphere(f"Thumb{side}", 0.025, (s * 0.01, FRONT * 0.30, 0.885), scale=(1, 1, 1.8), material=M["skin"], seg=16, rings=8)
    return join(f"Arm{side}", [upper, fore, shoulderball, elbowball, cuff, hand, thumb])

armL = arm("L")
armR = arm("R")

# ---------------------------------------------------------------- head
HEAD_Z = 1.665
head = sphere("HeadBase", 0.25, (0, 0, HEAD_Z), scale=(0.9, 0.95, 1.1), material=M["skin"], seg=48, rings=24, sub=1)
def shape_head(co):
    dz = co.z - HEAD_Z
    if dz < -0.04:  # narrower jaw and chin
        k = 1 - min(0.22, (-dz - 0.04) * 0.9)
        co.x *= k
    if co.y < -0.12 and -0.12 < dz < 0.06:  # slight cheek fullness
        co.x *= 1.03
edit_verts(head, shape_head)
earL = sphere("EarL", 0.055, (-0.225, 0.02, HEAD_Z - 0.01), scale=(0.45, 0.7, 1.05), material=M["skin"], seg=16, rings=8)
earR = sphere("EarR", 0.055, (0.225, 0.02, HEAD_Z - 0.01), scale=(0.45, 0.7, 1.05), material=M["skin"], seg=16, rings=8)
nose = sphere("Nose", 0.03, (0, FRONT * 0.232, HEAD_Z - 0.03), scale=(0.85, 0.9, 1.25), material=M["skin"], seg=16, rings=8)
headObj = join("Head", [head, earL, earR, nose])

# Hair: a sculpted shell around the skull with a swept-up front (as in the photo)
hair = sphere("Hair", 0.258, (0, 0.006, HEAD_Z + 0.014), scale=(0.94, 0.99, 1.1), material=M["hair"], seg=64, rings=32, sub=0)
bm = bmesh.new()
bm.from_mesh(hair.data)
HC = HEAD_Z + 0.014  # mesh coordinates are world-space (transform_apply bakes location)
def bald(co):
    x, y, z = co.x, co.y, co.z - HC
    if y < -0.04 and z < 0.125 + 0.35 * max(0.0, abs(x) - 0.1):   # forehead hairline, slight temples
        return True
    if abs(x) > 0.14 and z < 0.02 and y < 0.08:                   # above the ears
        return True
    if z < -0.13:                                                  # nape
        return True
    return False
bmesh.ops.delete(bm, geom=[v for v in bm.verts if bald(v.co)], context="VERTS")
for v in bm.verts:
    x, y, z = v.co.x, v.co.y, v.co.z - HC
    if z > 0.06:  # volume on top
        k = min(1.0, (z - 0.06) / 0.2)
        v.co.x *= 1 + 0.05 * k
        v.co.z += 0.035 * k
    if y < -0.02 and z > 0.09:  # swept-up quiff at the front
        f = min(1.0, (-y - 0.02) / 0.2) * max(0.0, 1 - abs(x) / 0.26)
        v.co.z += 0.1 * f
        v.co.y -= 0.035 * f
bm.to_mesh(hair.data)
bm.free()
for p_ in hair.data.polygons:
    p_.use_smooth = True
sol = hair.modifiers.new("Thick", "SOLIDIFY")
sol.thickness = 0.022
sol.offset = 1.0
sub_mod = hair.modifiers.new("Subsurf", "SUBSURF")
sub_mod.levels = 1
sub_mod.render_levels = 1

# Eyes (sclera + iris + highlight) — separate so they can blink
def eye(side):
    s = 1 if side == "R" else -1
    ex, ez = s * 0.082, HEAD_Z + 0.025
    w = sphere(f"White{side}", 0.042, (ex, FRONT * 0.195, ez), scale=(1.15, 0.55, 0.95), material=M["eyeW"], seg=24, rings=12)
    i = sphere(f"Iris{side}", 0.026, (ex + s * 0.002, FRONT * 0.214, ez - 0.002), scale=(1, 0.45, 1.05), material=M["iris"], seg=24, rings=12)
    h = sphere(f"Glint{side}", 0.007, (ex + s * 0.01 - 0.008, FRONT * 0.226, ez + 0.012), material=M["teeth"], seg=8, rings=6, sub=0)
    return join(f"Eye{side}", [w, i, h])

eyeL, eyeR = eye("L"), eye("R")
browL = cube("BrowL", (0.085, 0.022, 0.018), (-0.085, FRONT * 0.205, HEAD_Z + 0.09), material=M["brow"], sub=2, rot=(0, math.radians(-8), 0))
browR = cube("BrowR", (0.085, 0.022, 0.018), (0.085, FRONT * 0.205, HEAD_Z + 0.09), material=M["brow"], sub=2, rot=(0, math.radians(8), 0))

# Mouth: a warm smile (lower half of a torus) with a hint of teeth
bpy.ops.mesh.primitive_torus_add(major_radius=0.058, minor_radius=0.011, major_segments=48, minor_segments=10,
                                 location=(0, FRONT * 0.205, HEAD_Z - 0.105), rotation=(math.radians(90), 0, 0))
smile = bpy.context.active_object
smile.name = "Smile"
bm = bmesh.new()
bm.from_mesh(smile.data)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.y > -0.004], context="VERTS")  # local y is world z after rotation
bm.to_mesh(smile.data)
bm.free()
assign(smile, M["lip"])
smooth(smile, 1)
teeth = sphere("Teeth", 0.045, (0, FRONT * 0.2, HEAD_Z - 0.112), scale=(1.0, 0.35, 0.32), material=M["teeth"], seg=24, rings=12)
mouth = join("Mouth", [smile, teeth])

# Head pivot at the neck so the whole head can turn and nod
bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 1.45))
pivot = bpy.context.active_object
pivot.name = "HeadPivot"
for o in [headObj, hair, eyeL, eyeR, browL, browR, mouth]:
    o.parent = pivot
    o.matrix_parent_inverse = pivot.matrix_world.inverted()

# Apply modifiers so the export is self-contained
for o in [plinth, body, armL, armR, headObj, hair, eyeL, eyeR, browL, browR, mouth]:
    apply_mods(o)
# Origins: eyes at their centres (for blinking), arms at shoulders
def set_origin(o, point):
    cur = bpy.context.scene.cursor
    cur.location = point
    bpy.ops.object.select_all(action="DESELECT")
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
set_origin(eyeL, (-0.082, FRONT * 0.2, HEAD_Z + 0.025))
set_origin(eyeR, (0.082, FRONT * 0.2, HEAD_Z + 0.025))
set_origin(armL, (-0.33, 0, 1.3))
set_origin(armR, (0.33, 0, 1.3))
set_origin(body, (0, 0, 0.75))

# ---------------------------------------------------------------- export GLB
bpy.ops.object.select_all(action="SELECT")
glb = os.path.join(OUT, "brill-3d.glb")
kwargs = dict(filepath=glb, export_format="GLB", use_selection=False, export_yup=True)
try:
    bpy.ops.export_scene.gltf(**kwargs, export_apply=True)
except TypeError:
    bpy.ops.export_scene.gltf(**kwargs)
print("EXPORTED", glb, os.path.getsize(glb) // 1024, "KB")

# ---------------------------------------------------------------- render stills
world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = srgb("#2A4BE0")
world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6

def light(name, kind, loc, energy, color="#FFFFFF", size=2.0, rot=None):
    ld = bpy.data.lights.new(name, kind)
    ld.energy = energy
    ld.color = srgb(color)[:3]
    if kind == "AREA":
        ld.size = size
    lo = bpy.data.objects.new(name, ld)
    lo.location = loc
    scene.collection.objects.link(lo)
    tgt = Vector((0, 0, 1.2))
    lo.rotation_euler = (tgt - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    return lo

light("Key", "AREA", (-2.2, -2.6, 3.0), 520, "#FFF6E8", 2.5)
light("Fill", "AREA", (2.6, -2.0, 1.6), 180, "#C9D6FF", 3.0)
light("Rim", "AREA", (1.2, 2.6, 2.8), 420, "#FFD43B", 1.5)

cam_d = bpy.data.cameras.new("Cam")
cam = bpy.data.objects.new("Cam", cam_d)
scene.collection.objects.link(cam)
scene.camera = cam

def shoot(path, loc, target, lens, res):
    cam.location = loc
    cam.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    cam_d.lens = lens
    scene.render.resolution_x, scene.render.resolution_y = res
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print("RENDERED", path)

scene.render.film_transparent = True
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
engine_set = False
for eng in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
    try:
        scene.render.engine = eng
        engine_set = True
        break
    except TypeError:
        continue
try:
    scene.eevee.taa_render_samples = 64
except Exception:
    pass
try:
    shoot(os.path.join(OUT, "brill-3d.png"), (1.05, -3.6, 1.55), (0, 0, 1.02), 50, (1000, 1400))
    shoot(os.path.join(OUT, "brill-3d-face.png"), (0.25, -1.25, 1.78), (0, 0, 1.72), 70, (600, 600))
except Exception as exc:  # EEVEE may be unavailable headless; fall back to Cycles CPU
    print("EEVEE failed:", exc)
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 48
    scene.cycles.device = "CPU"
    shoot(os.path.join(OUT, "brill-3d.png"), (1.05, -3.6, 1.55), (0, 0, 1.02), 50, (1000, 1400))
    shoot(os.path.join(OUT, "brill-3d-face.png"), (0.25, -1.25, 1.78), (0, 0, 1.72), 70, (600, 600))

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(os.path.dirname(os.path.abspath(__file__)), "brill.blend"))
print("DONE")
