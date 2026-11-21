"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type * as T from "three";

/**
 * Brill in 3D — the Blender-built model (public/brand/brill-3d.glb) brought to life:
 * head follows the pointer, natural blinking, breathing, drag to turn,
 * and a friendly nod whenever someone opens "Ask Brill".
 * Shows the Blender render until WebGL is ready (and for reduced motion).
 */
export default function Brill3D({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the still render
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.touchAction = "pan-y";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, el.clientWidth / el.clientHeight, 0.1, 50);
      camera.position.set(0.55, 1.25, 4.6);
      camera.lookAt(0, 1.02, 0);

      scene.add(new THREE.HemisphereLight(0xe6ecff, 0x0a30c4, 1.25));
      const key = new THREE.DirectionalLight(0xfff3e0, 2.6);
      key.position.set(-2.5, 3.5, 3);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffd43b, 2.2);
      rim.position.set(2.2, 2.6, -2.4);
      scene.add(rim);
      const fill = new THREE.DirectionalLight(0xbfd0ff, 0.8);
      fill.position.set(2.5, 1, 2.5);
      scene.add(fill);

      const gltf = await new GLTFLoader().loadAsync("/brand/brill-3d.glb");
      if (disposed) return;
      const root = new THREE.Group();
      root.add(gltf.scene);
      scene.add(root);

      const find = (n: string) => gltf.scene.getObjectByName(n);
      const head = find("HeadPivot");
      const eyes = [find("EyeL"), find("EyeR")].filter(Boolean) as T.Object3D[];
      const body = find("Body");
      const arms = [find("ArmL"), find("ArmR")].filter(Boolean) as T.Object3D[];
      const headBase = head ? head.rotation.clone() : null;
      const armBase = arms.map((a) => a.position.y);

      // Pointer: head tracks it; drag turns the whole figure
      const p = { x: 0, y: 0, tx: 0, ty: 0 };
      let drag = 0;
      let dragTarget = 0;
      let dragging = false;
      let lastX = 0;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        p.tx = Math.max(-1, Math.min(1, ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 0.8));
        p.ty = Math.max(-1, Math.min(1, ((e.clientY - (r.top + r.height * 0.3)) / (r.height / 2)) * 0.8));
        if (dragging) {
          dragTarget += (e.clientX - lastX) * 0.012;
          lastX = e.clientX;
        }
      };
      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
      };
      const onUp = () => {
        dragging = false;
        dragTarget = 0;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      renderer.domElement.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);

      // Friendly nod when the guide opens
      let nodT = -1;
      const onNod = () => (nodT = 0);
      window.addEventListener("brill:open", onNod);

      const ro = new ResizeObserver(() => {
        renderer.setSize(el.clientWidth, el.clientHeight);
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
      });
      ro.observe(el);

      let visible = true;
      let raf = 0;
      const io = new IntersectionObserver(([en]) => {
        visible = en.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      });
      io.observe(el);

      const clock = new THREE.Clock();
      let nextBlink = 2;
      let blinkT = -1;
      let intro = 0;

      function loop() {
        if (!visible) {
          raf = 0;
          return;
        }
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        intro = Math.min(1, intro + dt * 0.8);
        const e = 1 - Math.pow(1 - intro, 3);

        p.x += (p.tx - p.x) * 0.08;
        p.y += (p.ty - p.y) * 0.08;
        drag += (dragTarget - drag) * 0.1;

        root.rotation.y = (1 - e) * -1.1 + Math.sin(t * 0.5) * 0.06 + p.x * 0.18 + drag;
        root.position.y = (1 - e) * -0.15;

        if (head && headBase) {
          let nod = 0;
          if (nodT >= 0) {
            nodT += dt;
            nod = Math.sin(Math.min(1, nodT / 0.9) * Math.PI * 2) * 0.16;
            if (nodT > 0.9) nodT = -1;
          }
          head.rotation.y = headBase.y + p.x * 0.45;
          head.rotation.x = headBase.x + p.y * 0.18 + nod;
          head.rotation.z = headBase.z + Math.sin(t * 0.7) * 0.025;
        }
        if (body) body.scale.y = 1 + Math.sin(t * 1.7) * 0.008;
        arms.forEach((a, i) => (a.position.y = armBase[i] + Math.sin(t * 1.7) * 0.004));

        // Blink
        if (blinkT < 0 && t > nextBlink) blinkT = 0;
        if (blinkT >= 0) {
          blinkT += dt;
          const k = blinkT < 0.07 ? 1 - blinkT / 0.07 : Math.min(1, (blinkT - 0.07) / 0.09);
          eyes.forEach((o) => (o.scale.y = Math.max(0.08, k)));
          if (blinkT > 0.16) {
            blinkT = -1;
            eyes.forEach((o) => (o.scale.y = 1));
            nextBlink = t + 2.2 + Math.random() * 3.2;
          }
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("brill:open", onNod);
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
    })().catch(() => setReady(false));

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className={className || "relative h-full w-full"}>
      <Image
        src="/brand/brill-3d.png"
        alt="Brill, the Brillianton guide, as a 3D character in a charcoal blazer standing on a royal-blue plinth"
        fill
        sizes="(min-width:1024px) 40vw, 90vw"
        className={`object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
        priority={false}
      />
      <div ref={host} className={`absolute inset-0 cursor-grab transition-opacity duration-700 active:cursor-grabbing ${ready ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
