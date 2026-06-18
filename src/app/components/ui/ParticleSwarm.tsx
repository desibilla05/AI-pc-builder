import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleSwarm() {
  const containerRef = useRef<HTMLDivElement>(null);

  const controlsRef = useRef<Record<string, number>>({
    speed: 1.5,
    noise: 8.0,
    size: 95.5,
    darkTheme: 1.0 // Always white particles against welcome background
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Swarm Particles setup (20,000+ units)
    const count = 20000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Initialize buffers
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Minimal dynamic size attenuated points
    const material = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 3. Pre-allocated mutable objects (Strict Zero Garbage Collection rules)
    const tempTarget = new THREE.Vector3();
    const tempColor = new THREE.Color();
    let animationFrameId: number;
    const clock = new THREE.Clock();

    // Context helper functions mapped inside the render loop
    const addControl = (id: string, _label: string, _min: number, _max: number, initialValue: number) => {
      if (controlsRef.current[id] === undefined) {
        controlsRef.current[id] = initialValue;
      }
      return controlsRef.current[id];
    };

    // User's customized highly-optimized particle updater
    const updateParticle = (
      i: number,
      count: number,
      target: THREE.Vector3,
      color: THREE.Color,
      time: number,
      _THREE_LIB: typeof THREE
    ) => {
      // --- PARTICLE PHYSICS FUNCTION BODY ---
      const speed = addControl("speed", "Rotation Speed", 0.1, 2.0, 0.5);
      const noise = addControl("noise", "Turbulence", 0.0, 10.0, 2.5);
      const size = addControl("size", "Swarm Size", 10, 100, 45);
      const darkTheme = addControl("darkTheme", "Dark Theme", 0, 1, 1);

      const phi = i * 0.1375;
      const theta = Math.acos(1 - (2 * i) / count);

      // Parametric double-helix breathing torus sphere projection
      const breathing = Math.sin(time * speed + phi) * 0.12 + 0.88;
      const radius = size * breathing;

      const x = radius * Math.sin(theta) * Math.cos(phi + time * speed * 0.25);
      const y = radius * Math.sin(theta) * Math.sin(phi + time * speed * 0.25);
      const z = radius * Math.cos(theta) + Math.sin(phi * 6.0 + time * speed) * noise;

      target.set(x, y, z);

      // Black and white (monochrome theme compliance)
      const variation = (i % 25) * 0.01;
      let lightness = 0.0;
      if (darkTheme > 0.5) {
        // Dark theme: white/light grey particles
        lightness = 0.65 + variation;
      } else {
        // Light theme: black/dark grey particles
        lightness = 0.22 - variation;
      }
      color.setHSL(0.0, 0.0, lightness);
      // --------------------------------------
    };

    // 4. Tick loop
    const animate = () => {
      const time = clock.getElapsedTime();
      
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;
      
      for (let i = 0; i < count; i++) {
        updateParticle(i, count, tempTarget, tempColor, time, THREE);
        
        posAttr.setXYZ(i, tempTarget.x, tempTarget.y, tempTarget.z);
        colAttr.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Add gentle rotation
      points.rotation.y = time * 0.04;
      points.rotation.x = time * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 5. Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Three.js canvas mount point */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
