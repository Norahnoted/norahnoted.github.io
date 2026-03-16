'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Shapes: position, size, rotation speed, float speed
const SHAPES = [
  { type: 'icosahedron', size: 0.7,  x: -4.5, y:  1.5, z: -3, rot: 0.004, float: 0.5  },
  { type: 'octahedron',  size: 0.55, x:  4.0, y: -1.2, z: -2, rot: 0.006, float: 0.7  },
  { type: 'icosahedron', size: 0.4,  x: -1.5, y: -4.5, z: -4, rot: 0.008, float: 0.4  },
  { type: 'octahedron',  size: 0.9,  x:  3.5, y:  2.2, z: -5, rot: 0.003, float: 0.6  },
  { type: 'icosahedron', size: 0.45, x: -3.8, y: -0.8, z: -2, rot: 0.005, float: 0.8  },
  { type: 'octahedron',  size: 0.35, x:  1.5, y:  2.8, z: -1, rot: 0.007, float: 0.35 },
  { type: 'icosahedron', size: 0.6,  x:  0.5, y: -4.0, z: -5, rot: 0.004, float: 0.55 },
];

// Scene-wide left→right gradient: dark olive → light sage
const SCENE_X_MIN  = -5.5;
const SCENE_X_MAX  =  5.0;
const COLOR_LEFT   = new THREE.Color(0x2E3A18);
const COLOR_RIGHT  = new THREE.Color(0x9DB86A);

function applyHorizontalGradient(geo, meshX) {
  const pos    = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c      = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const worldX = pos.getX(i) + meshX;
    const t = Math.max(0, Math.min(1, (worldX - SCENE_X_MIN) / (SCENE_X_MAX - SCENE_X_MIN)));
    c.lerpColors(COLOR_LEFT, COLOR_RIGHT, t);
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    // ── Shapes ────────────────────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    const meshes = SHAPES.map((cfg) => {
      const geo =
        cfg.type === 'icosahedron'
          ? new THREE.IcosahedronGeometry(cfg.size, 0)
          : new THREE.OctahedronGeometry(cfg.size, 0);

      applyHorizontalGradient(geo, cfg.x);

      const mat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.userData = { ...cfg, originY: cfg.y, phase: Math.random() * Math.PI * 2 };
      group.add(mesh);
      return mesh;
    });

    // ── Mouse parallax ────────────────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 };
    const eased  = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse easing
      eased.x += (mouse.x * 0.25 - eased.x) * 0.04;
      eased.y += (mouse.y * 0.25 - eased.y) * 0.04;
      group.rotation.y = eased.x * 0.4;
      group.rotation.x = eased.y * 0.25;

      // Per-shape animation
      meshes.forEach((mesh) => {
        const { rot, float: spd, originY, phase } = mesh.userData;
        mesh.rotation.x += rot;
        mesh.rotation.y += rot * 1.4;
        mesh.position.y = originY + Math.sin(t * spd + phase) * 0.25;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
