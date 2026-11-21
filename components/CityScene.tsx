"use client";

import { useEffect, useRef } from "react";
import type * as T from "three";

/**
 * "An Imagined City of Brilliance" — WebGL hero scene.
 * The Brillianton mark is extruded into a 3D monument at the centre of a skyline of
 * pillar-towers. Pointer moves the camera; scroll lifts it away. Pauses off-screen.
 */
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 118">
<path id="cap" d="M38 9 70 0l32 9-32 9z"/>
<path d="M0 118V62C0 50 7 43 18 42l8-1v77z"/>
<path d="M33 118V37c3-8 14-13 30-15v96z"/>
<path d="M77 118V22c16 2 27 7 30 15v81z"/>
<path d="M114 118V41l8 1c11 1 18 8 18 20v56z"/></svg>`;

export default function CityScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;

      const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.75));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0b34cc, small ? 0.036 : 0.028);

      const camera = new THREE.PerspectiveCamera(small ? 52 : 38, host.clientWidth / host.clientHeight, 0.1, 200);
      const camBase = new THREE.Vector3(small ? 0 : -7.5, 7, small ? 34 : 27);
      camera.position.copy(camBase);
      const target = new THREE.Vector3(small ? 0 : -7.5, 5, 0);

      // Lights
      scene.add(new THREE.AmbientLight(0x6f8cff, 0.55));
      const key = new THREE.DirectionalLight(0xdfe8ff, 2.2);
      key.position.set(-10, 18, 14);
      scene.add(key);
      const rim = new THREE.PointLight(0xffd43b, 70, 40, 1.6);
      rim.position.set(4, 9, -8);
      scene.add(rim);
      const fill = new THREE.PointLight(0x1a3cf0, 80, 50, 1.4);
      fill.position.set(-8, 3, 8);
      scene.add(fill);

      const world = new THREE.Group();
      scene.add(world);

      // --- Monument: extruded brand mark
      const svg = new SVGLoader().parse(MARK_SVG);
      const monument = new THREE.Group();
      const pillarMat = new THREE.MeshPhysicalMaterial({ color: 0xf3f6ff, metalness: 0.12, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.15 });
      const capMat = new THREE.MeshStandardMaterial({ color: 0xffd43b, emissive: 0xffc61a, emissiveIntensity: 0.55, roughness: 0.3 });
      svg.paths.forEach((p) => {
        const isCap = (p.userData?.node as Element | undefined)?.getAttribute("id") === "cap";
        SVGLoader.createShapes(p).forEach((shape) => {
          const g = new THREE.ExtrudeGeometry(shape, { depth: isCap ? 26 : 22, bevelEnabled: true, bevelThickness: 1, bevelSize: 0.8, bevelSegments: 3, curveSegments: 24 });
          g.translate(-70, -118, isCap ? -13 : -11);
          const m = new THREE.Mesh(g, isCap ? capMat : pillarMat);
          m.userData.isCap = isCap;
          monument.add(m);
        });
      });
      monument.scale.set(0.088, -0.088, 0.088); // flip SVG y
      monument.position.set(0, 0, 0);
      const monumentWrap = new THREE.Group();
      monumentWrap.add(monument);
      world.add(monumentWrap);

      // Halo rings — the "global" orbit
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
      const ringA = new THREE.Mesh(new THREE.TorusGeometry(8.6, 0.028, 8, 200), ringMat);
      ringA.position.y = 5.2;
      ringA.rotation.x = Math.PI / 2.25;
      const ringB = new THREE.Mesh(new THREE.TorusGeometry(10.2, 0.02, 8, 200), ringMat.clone());
      (ringB.material as T.MeshBasicMaterial).opacity = 0.3;
      ringB.position.y = 5.2;
      ringB.rotation.set(Math.PI / 1.8, 0.5, 0);
      world.add(ringA, ringB);
      // satellites on ring A
      const satGeo = new THREE.SphereGeometry(0.11, 16, 16);
      const sats = [0, 2.1, 4.2].map((o) => {
        const s = new THREE.Mesh(satGeo, capMat);
        s.userData.o = o;
        ringA.add(s);
        return s;
      });

      // --- City: instanced pillar towers with arched tops feel (rounded boxes approximated)
      const count = small ? 170 : 360;
      const towerGeo = new THREE.BoxGeometry(1, 1, 1);
      towerGeo.translate(0, 0.5, 0);
      const towerMat = new THREE.MeshStandardMaterial({ color: 0x1238c8, metalness: 0.35, roughness: 0.5 });
      const towers = new THREE.InstancedMesh(towerGeo, towerMat, count);
      const glowGeo = new THREE.BoxGeometry(1, 0.06, 1);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x4fe3ff, transparent: true, opacity: 0.85 });
      const glows = new THREE.InstancedMesh(glowGeo, glowMat, count);
      const dummy = new THREE.Object3D();
      const col = new THREE.Color();
      let placed = 0;
      let tries = 0;
      const rand = (() => {
        let s = 7;
        return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
      })();
      while (placed < count && tries < count * 20) {
        tries++;
        const gx = Math.round((rand() - 0.5) * 44);
        const gz = Math.round((rand() - 0.5) * 44);
        const d = Math.hypot(gx, gz);
        if (d < 10 || d > 21) continue;
        const h = Math.max(0.4, (0.35 + (d - 10) / 14) * (1.5 + rand() * 5.5));
        const w = 0.55 + rand() * 0.35;
        dummy.position.set(gx * 1.05, 0, gz * 1.05);
        dummy.scale.set(w, h, w);
        dummy.rotation.y = 0;
        dummy.updateMatrix();
        towers.setMatrixAt(placed, dummy.matrix);
        col.setHSL(0.635 + rand() * 0.015, 0.9, 0.2 + rand() * 0.14);
        towers.setColorAt(placed, col);
        dummy.position.y = h + 0.03;
        dummy.scale.set(w * 1.001, 1, w * 1.001);
        dummy.updateMatrix();
        glows.setMatrixAt(placed, dummy.matrix);
        col.set(rand() > 0.72 ? 0xffd43b : 0xdfe6ff);
        glows.setColorAt(placed, col);
        placed++;
      }
      towers.count = placed;
      glows.count = placed;
      world.add(towers, glows);

      // Ground grid
      const grid = new THREE.GridHelper(60, 60, 0xffffff, 0xffffff);
      (grid.material as T.Material).transparent = true;
      (grid.material as T.Material).opacity = 0.1;
      world.add(grid);

      // Light motes rising
      const moteCount = small ? 260 : 600;
      const motePos = new Float32Array(moteCount * 3);
      for (let i = 0; i < moteCount; i++) {
        motePos[i * 3] = (rand() - 0.5) * 44;
        motePos[i * 3 + 1] = rand() * 18;
        motePos[i * 3 + 2] = (rand() - 0.5) * 44;
      }
      const moteGeo = new THREE.BufferGeometry();
      moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
      const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({ color: 0xfff1b8, size: 0.07, transparent: true, opacity: 0.8, depthWrite: false }));
      world.add(motes);

      // Interaction state
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const onResize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(host);

      let visible = true;
      const io = new IntersectionObserver(([en]) => {
        visible = en.isIntersecting;
        if (visible && !raf && !reduce) raf = requestAnimationFrame(loop);
      });
      io.observe(host);

      const clock = new THREE.Clock();
      let raf = 0;
      let intro = reduce ? 1 : 0;

      const render = (t: number, dt: number) => {
        intro = Math.min(1, intro + dt * 0.35);
        const e = 1 - Math.pow(1 - intro, 3);
        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;
        const scroll = Math.min(1, window.scrollY / window.innerHeight);

        world.rotation.y = t * 0.04 + (1 - e) * -0.9;
        monumentWrap.position.y = Math.sin(t * 0.8) * 0.18 + (1 - e) * -6;
        monument.children.forEach((m) => {
          if (m.userData.isCap) m.position.y = -Math.sin(t * 1.2) * 6 - 6;
        });
        monumentWrap.rotation.y = -world.rotation.y + Math.sin(t * 0.3) * 0.35 + pointer.x * 0.25;
        ringA.rotation.z = t * 0.25;
        ringB.rotation.z = -t * 0.15;
        sats.forEach((s) => {
          const a = t * 0.6 + s.userData.o;
          s.position.set(Math.cos(a) * 8.6, Math.sin(a) * 8.6, 0);
        });
        const arr = moteGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < moteCount; i++) {
          arr[i * 3 + 1] += dt * (0.25 + (i % 7) * 0.05);
          if (arr[i * 3 + 1] > 18) arr[i * 3 + 1] = 0;
        }
        moteGeo.attributes.position.needsUpdate = true;

        camera.position.set(
          camBase.x + pointer.x * 2.2,
          camBase.y + -pointer.y * 1.2 + scroll * 7 + (1 - e) * 6,
          camBase.z + scroll * 6 + (1 - e) * 8
        );
        camera.lookAt(target.x, target.y + scroll * 2, target.z);
        renderer.render(scene, camera);
      };

      const loop = () => {
        if (!visible) {
          raf = 0;
          return;
        }
        const dt = Math.min(clock.getDelta(), 0.05);
        render(clock.elapsedTime, dt);
        raf = requestAnimationFrame(loop);
      };

      if (reduce) render(2, 0);
      else raf = requestAnimationFrame(loop);
      host.dataset.ready = "1";

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointer);
        ro.disconnect();
        io.disconnect();
        scene.traverse((o) => {
          const m = o as T.Mesh;
          m.geometry?.dispose?.();
          const mat = m.material as T.Material | T.Material[] | undefined;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else mat?.dispose?.();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className={`transition-opacity duration-1000 ${className}`} />;
}
