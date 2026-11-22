"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type * as T from "three";
import { Arrow, ease } from "@/components/ui/primitives";
import { homeBase, opportunities, type Opportunity } from "@/lib/site";

const filters = ["All", "School", "Undergraduate", "Postgraduate"] as const;
type Filter = (typeof filters)[number];

const toRad = (d: number) => (d * Math.PI) / 180;
/** Great-circle distance in km (haversine) */
function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round((2 * R * Math.asin(Math.sqrt(h))) / 10) * 10;
}

/**
 * Interactive 3D globe: arcs fly from India to every destination Brillianton mentees prepare for.
 * Drag to spin, click a destination (or the list) to fly there. Tours itself when idle.
 */
export default function GlobeExplorer({ tone = "light" }: { tone?: "light" | "dark" }) {
  const host = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const homeLabel = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState(0);
  const [glReady, setGlReady] = useState(false);
  const interacted = useRef(false);

  const mapped = useMemo(() => opportunities.filter((o) => o.geo), []);
  const visible = useMemo(() => mapped.map((o) => filter === "All" || o.level === filter), [mapped, filter]);
  const list = useMemo(() => opportunities.filter((o) => filter === "All" || o.level === filter), [filter]);
  const current: Opportunity | undefined = mapped[active];

  // Refs shared with the render loop
  const activeRef = useRef(active);
  const visibleRef = useRef(visible);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    visibleRef.current = visible;
    if (!visible[active]) {
      const first = visible.findIndex(Boolean);
      if (first >= 0) setActive(first);
    }
  }, [visible, active]);

  // Idle tour through destinations until someone interacts
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (interacted.current) return;
      setActive((a) => {
        for (let k = 1; k <= mapped.length; k++) {
          const n = (a + k) % mapped.length;
          if (visibleRef.current[n]) return n;
        }
        return a;
      });
    }, 4800);
    return () => clearInterval(t);
  }, [mapped.length]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const dots: number[] = await fetch("/data/land-dots.json").then((r) => r.json());
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.touchAction = "pan-y";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, el.clientWidth / el.clientHeight, 0.1, 50);
      camera.position.set(0, 0, 4.1);

      const earth = new THREE.Group();
      scene.add(earth);

      const vec = (lat: number, lon: number, r = 1) => {
        const phi = toRad(90 - lat);
        const theta = toRad(lon + 180);
        return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
      };

      // Ocean sphere
      earth.add(new THREE.Mesh(new THREE.SphereGeometry(0.995, 64, 64), new THREE.MeshBasicMaterial({ color: 0x0b1550 })));

      // Atmosphere glow (back-side fresnel)
      const atmo = new THREE.Mesh(
        new THREE.SphereGeometry(1.16, 64, 64),
        new THREE.ShaderMaterial({
          vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
          fragmentShader: "varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(0.33,0.49,1.0,1.0) * i; }",
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          transparent: true,
        })
      );
      scene.add(atmo);

      // Land dots
      const n = dots.length / 2;
      const dotGeo = new THREE.CircleGeometry(0.0068, 6);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xc8d4ff, side: THREE.DoubleSide });
      const land = new THREE.InstancedMesh(dotGeo, dotMat, n);
      const o3 = new THREE.Object3D();
      for (let i = 0; i < n; i++) {
        const p = vec(dots[i * 2], dots[i * 2 + 1], 1.001);
        o3.position.copy(p);
        o3.lookAt(p.clone().multiplyScalar(2));
        o3.updateMatrix();
        land.setMatrixAt(i, o3.matrix);
      }
      earth.add(land);

      // Home base
      const home = vec(homeBase.lat, homeBase.lon, 1.0);
      const homeDot = new THREE.Mesh(new THREE.SphereGeometry(0.026, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      homeDot.position.copy(home);
      earth.add(homeDot);
      const ringGeo = new THREE.RingGeometry(0.03, 0.04, 40);
      const homeRing = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, side: THREE.DoubleSide }));
      homeRing.position.copy(home.clone().multiplyScalar(1.002));
      homeRing.lookAt(home.clone().multiplyScalar(2));
      earth.add(homeRing);

      // Destinations: marker, pulse ring, arc and travelling comet
      type Dest = { pos: T.Vector3; marker: T.Mesh; ring: T.Mesh; arc: T.Mesh; arcMat: T.MeshBasicMaterial; comet: T.Mesh; curve: T.CubicBezierCurve3; total: number; drawn: number };
      const dests: Dest[] = mapped.map((o) => {
        const pos = vec(o.geo!.lat, o.geo!.lon, 1.0);
        const marker = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffd43b, transparent: true }));
        marker.position.copy(pos);
        earth.add(marker);
        const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffd43b, transparent: true, side: THREE.DoubleSide }));
        ring.position.copy(pos.clone().multiplyScalar(1.002));
        ring.lookAt(pos.clone().multiplyScalar(2));
        earth.add(ring);
        const dist = home.distanceTo(pos);
        const lift = 1 + dist * 0.42;
        const c1 = home.clone().lerp(pos, 0.25).normalize().multiplyScalar(lift);
        const c2 = home.clone().lerp(pos, 0.75).normalize().multiplyScalar(lift);
        const curve = new THREE.CubicBezierCurve3(home.clone(), c1, c2, pos.clone());
        const arcGeo = new THREE.TubeGeometry(curve, 96, 0.0042, 6, false);
        const arcMat = new THREE.MeshBasicMaterial({ color: 0xffd43b, transparent: true, opacity: 0.85 });
        const arc = new THREE.Mesh(arcGeo, arcMat);
        const total = arcGeo.index ? arcGeo.index.count : 0;
        arcGeo.setDrawRange(0, reduce ? total : 0);
        earth.add(arc);
        const comet = new THREE.Mesh(new THREE.SphereGeometry(0.014, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true }));
        earth.add(comet);
        return { pos, marker, ring, arc, arcMat, comet, curve, total, drawn: reduce ? 1 : 0 };
      });

      // Orientation: start facing India, then follow the active destination
      const rot = { x: 0.35, y: 0, tx: 0.35, ty: 0 };
      const face = (p: T.Vector3) => {
        const ry = Math.atan2(-p.x, p.z);
        const rho = Math.hypot(p.x, p.z);
        const rx = Math.atan2(p.y, rho) * 0.75;
        return { rx, ry };
      };
      const start = face(home);
      rot.x = rot.tx = start.rx;
      rot.y = rot.ty = start.ry;
      const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

      // Drag to spin; click a marker to select it
      let dragging = false;
      let moved = 0;
      let lastX = 0;
      let lastY = 0;
      let lastActive = -1;
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const pick = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(dests.map((d) => d.marker).concat(dests.map((d) => d.ring)), false);
        if (!hits.length) return -1;
        return dests.findIndex((d) => d.marker === hits[0].object || d.ring === hits[0].object);
      };
      const onDown = (e: PointerEvent) => {
        dragging = true;
        moved = 0;
        lastX = e.clientX;
        lastY = e.clientY;
        interacted.current = true;
      };
      const onMove = (e: PointerEvent) => {
        if (dragging) {
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          moved += Math.abs(dx) + Math.abs(dy);
          rot.ty += dx * 0.006;
          rot.tx = Math.max(-1.1, Math.min(1.1, rot.tx + dy * 0.004));
          lastX = e.clientX;
          lastY = e.clientY;
        } else if (e.target === renderer.domElement) {
          renderer.domElement.style.cursor = pick(e) >= 0 ? "pointer" : "grab";
        }
      };
      const onUp = (e: PointerEvent) => {
        if (dragging && moved < 6 && e.target === renderer.domElement) {
          const i = pick(e);
          if (i >= 0 && visibleRef.current[i]) setActive(i);
        }
        dragging = false;
      };
      renderer.domElement.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);

      const ro = new ResizeObserver(() => {
        renderer.setSize(el.clientWidth, el.clientHeight);
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
      });
      ro.observe(el);

      let inView = true;
      let raf = 0;
      const io = new IntersectionObserver(([en]) => {
        inView = en.isIntersecting;
        if (inView && !raf) raf = requestAnimationFrame(loop);
      });
      io.observe(el);

      const clock = new THREE.Clock();
      const tmp = new THREE.Vector3();
      const camDir = new THREE.Vector3(0, 0, 1);

      const placeLabel = (node: HTMLElement | null, world: T.Vector3, show: boolean) => {
        if (!node) return;
        const normal = world.clone().normalize();
        const facing = normal.dot(camDir) > 0.15;
        tmp.copy(world).project(camera);
        const x = (tmp.x * 0.5 + 0.5) * el.clientWidth;
        const y = (-tmp.y * 0.5 + 0.5) * el.clientHeight;
        node.style.transform = `translate(${x}px, ${y}px)`;
        node.style.opacity = show && facing ? "1" : "0";
      };

      function loop() {
        if (!inView) {
          raf = 0;
          return;
        }
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        const a = activeRef.current;
        const vis = visibleRef.current;

        // Fly to the active destination when it changes; otherwise drift slowly
        if (a !== lastActive && dests[a]) {
          const f = face(dests[a].pos.clone().lerp(home, 0.35));
          rot.tx = f.rx;
          rot.ty = rot.y + wrap(f.ry - rot.y);
          lastActive = a;
        } else if (!dragging && !reduce) {
          rot.ty += dt * 0.025;
        }
        rot.x += (rot.tx - rot.x) * 0.06;
        rot.y += (rot.ty - rot.y) * 0.06;
        earth.rotation.set(rot.x, rot.y, 0);

        const pulse = (t % 1.8) / 1.8;
        homeRing.scale.setScalar(1 + pulse * 1.6);
        (homeRing.material as T.MeshBasicMaterial).opacity = 1 - pulse;

        dests.forEach((d, i) => {
          const on = i === a;
          const shown = vis[i];
          // draw arcs in
          const target = shown ? 1 : 0;
          d.drawn += (target - d.drawn) * (reduce ? 1 : 0.035);
          d.arc.geometry.setDrawRange(0, Math.floor(d.total * Math.min(1, d.drawn)));
          d.arcMat.opacity = shown ? (on ? 1 : 0.45) : 0;
          (d.marker.material as T.MeshBasicMaterial).opacity = shown ? 1 : 0.15;
          d.marker.scale.setScalar(on ? 1.6 : 1);
          const rp = ((t + i * 0.3) % 2) / 2;
          d.ring.scale.setScalar(on ? 1 + rp * 2.2 : 0.001);
          (d.ring.material as T.MeshBasicMaterial).opacity = on ? 1 - rp : 0;
          // comet travelling along the arc
          if (shown && d.drawn > 0.95 && !reduce) {
            const ct = ((t * 0.35 + i * 0.17) % 1);
            d.comet.position.copy(d.curve.getPoint(ct));
            (d.comet.material as T.MeshBasicMaterial).opacity = on ? 1 : 0.5;
            d.comet.visible = true;
          } else d.comet.visible = false;

          const wp = d.marker.getWorldPosition(new THREE.Vector3());
          placeLabel(labelRefs.current[i], wp, shown && on);
          const lab = labelRefs.current[i];
          if (lab) lab.dataset.active = on ? "1" : "0";
        });
        placeLabel(homeLabel.current, homeDot.getWorldPosition(new THREE.Vector3()), true);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
      setGlReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        renderer.domElement.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        ro.disconnect();
        io.disconnect();
        scene.traverse((o) => {
          const m = o as T.Mesh;
          m.geometry?.dispose?.();
          const mt = m.material as T.Material | T.Material[] | undefined;
          if (Array.isArray(mt)) mt.forEach((x) => x.dispose());
          else mt?.dispose?.();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [mapped]);

  const dark = tone === "dark";
  const choose = (o: Opportunity) => {
    interacted.current = true;
    const i = mapped.indexOf(o);
    if (i >= 0) setActive(i);
  };
  const selectedIsMapped = current && list.includes(current);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      {/* Globe */}
      <div className="relative lg:col-span-7">
        <div className="relative mx-auto aspect-square w-full max-w-[680px]">
          <div aria-hidden className={`absolute inset-[8%] rounded-full ${dark ? "bg-azure/20" : "bg-royal/10"} blur-3xl`} />
          <div ref={host} className={`absolute inset-0 transition-opacity duration-1000 ${glReady ? "opacity-100" : "opacity-0"}`} />
          {!glReady && <div aria-hidden className="absolute inset-[14%] animate-pulse rounded-full bg-navy/80" />}
          {/* Floating labels positioned by the render loop */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div ref={homeLabel} className="absolute left-0 top-0 opacity-0 transition-opacity duration-300">
              <span className="-translate-x-1/2 translate-y-3 block whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink shadow">
                India
              </span>
            </div>
            {mapped.map((o, i) => (
              <div
                key={o.name}
                ref={(node) => {
                  labelRefs.current[i] = node;
                }}
                className="group absolute left-0 top-0 opacity-0 transition-opacity duration-300"
              >
                <span className="-translate-x-1/2 -translate-y-[150%] block whitespace-nowrap rounded-full bg-ink/85 px-2.5 py-1 text-[0.68rem] font-semibold text-white shadow backdrop-blur group-data-[active='1']:bg-sun group-data-[active='1']:text-ink">
                  {o.geo!.city}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className={`mt-2 text-center text-xs uppercase tracking-[0.2em] ${dark ? "text-white/55" : "text-ink/45"}`}>Drag to spin · Tap a yellow marker</p>
      </div>

      {/* Panel */}
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Filter destinations by stage" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => {
                interacted.current = true;
                setFilter(f);
              }}
              className={`relative min-h-[44px] rounded-full px-4 text-sm font-medium transition-colors ${filter === f ? "text-ink" : dark ? "text-white/70 hover:text-white" : "text-ink/65 hover:text-ink"}`}
            >
              {filter === f && <motion.span layoutId={`globe-pill-${tone}`} className="absolute inset-0 rounded-full bg-sun" transition={{ duration: 0.5, ease }} />}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {current && selectedIsMapped && (
            <motion.article
              key={current.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className={`mt-6 overflow-hidden rounded-[28px] p-7 text-white shadow-[0_30px_60px_-30px_rgba(11,18,54,0.6)] ${dark ? "bg-white/[0.07] ring-1 ring-white/15" : "bg-ink"}`}
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-sun">{current.kind}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em]">{current.level}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold leading-tight">{current.name}</h3>
              <p className="mt-1 text-sm text-white/60">{current.where}</p>
              <p className="mt-4 leading-relaxed text-white/80">{current.summary}</p>
              <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
                <span className="font-semibold text-white">India</span>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-white/40 via-sun to-white/40" />
                <span className="font-semibold text-white">{current.geo!.city}</span>
              </div>
              <p className="mt-1 text-right text-xs text-white/50">≈ {distanceKm(homeBase, current.geo!).toLocaleString("en-IN")} km as the crow flies</p>
              {current.external ? (
                <a href={current.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-sun px-6 text-sm font-semibold text-ink transition hover:bg-white">
                  {current.cta} <Arrow className="h-3 w-3" diagonal />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <Link href={current.href} className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-sun px-6 text-sm font-semibold text-ink transition hover:bg-white">
                  {current.cta} <Arrow className="h-3 w-3" />
                </Link>
              )}
            </motion.article>
          )}
        </AnimatePresence>

        <ul className={`mt-6 divide-y ${dark ? "divide-white/10 border-white/10" : "divide-ink/10 border-ink/10"} border-y`}>
          {list.map((o) => {
            const on = o === current;
            const hasGeo = !!o.geo;
            return (
              <li key={o.name}>
                {hasGeo ? (
                  <button
                    type="button"
                    onClick={() => choose(o)}
                    aria-pressed={on}
                    className={`group flex w-full items-center gap-4 py-3.5 text-left transition-colors ${dark ? "text-white" : "text-ink"}`}
                  >
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${on ? "scale-125 bg-sun ring-4 ring-sun/30" : dark ? "bg-white/30" : "bg-ink/25"}`} />
                    <span className={`flex-1 font-medium transition-transform duration-500 ease-expo ${on ? "translate-x-1" : "group-hover:translate-x-1"}`}>{o.name}</span>
                    <span className={`text-xs ${dark ? "text-white/50" : "text-ink/45"}`}>{o.geo!.city}</span>
                  </button>
                ) : (
                  <Link href={o.href} className={`group flex items-center gap-4 py-3.5 ${dark ? "text-white" : "text-ink"}`}>
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full border ${dark ? "border-white/40" : "border-ink/30"}`} />
                    <span className="flex-1 font-medium transition-transform duration-500 ease-expo group-hover:translate-x-1">{o.name}</span>
                    <span className={`text-xs ${dark ? "text-white/50" : "text-ink/45"}`}>{o.where}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
