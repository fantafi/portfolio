"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const nodePositions = [
  new THREE.Vector3(-1.8, 0.8, 0),
  new THREE.Vector3(-0.6, 1.25, 0.35),
  new THREE.Vector3(0.8, 0.9, -0.15),
  new THREE.Vector3(1.75, 0.1, 0.25),
  new THREE.Vector3(0.55, -0.95, 0),
  new THREE.Vector3(-1.25, -0.6, -0.2),
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 4],
  [0, 3],
];

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const showFallbackOnNextFrame = () => {
      const fallbackFrameId = window.requestAnimationFrame(() => {
        setShowFallback(true);
      });

      return () => {
        window.cancelAnimationFrame(fallbackFrameId);
      };
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!window.WebGLRenderingContext) {
      return showFallbackOnNextFrame();
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return showFallbackOnNextFrame();
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.setAttribute("role", "presentation");
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    const keyLight = new THREE.DirectionalLight(0xbdebdc, 2);
    keyLight.position.set(2.5, 2, 4);
    scene.add(ambientLight, keyLight);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.13, 2);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x16766a,
      metalness: 0.08,
      roughness: 0.42,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0e7490,
      emissiveIntensity: 0.18,
      metalness: 0.06,
      roughness: 0.35,
    });

    nodePositions.forEach((position, index) => {
      const node = new THREE.Mesh(
        nodeGeometry,
        index % 3 === 0 ? accentMaterial : nodeMaterial,
      );
      node.position.copy(position);
      group.add(node);
    });

    const linePoints: number[] = [];
    edges.forEach(([from, to]) => {
      linePoints.push(...nodePositions[from].toArray(), ...nodePositions[to].toArray());
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7bb9ad,
      opacity: 0.62,
      transparent: true,
    });
    group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const panelGeometry = new THREE.PlaneGeometry(1.1, 0.56);
    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.58,
      side: THREE.DoubleSide,
      transparent: true,
    });

    [
      { position: new THREE.Vector3(-1.55, -1.25, -0.08), rotation: 0.18 },
      { position: new THREE.Vector3(1.35, 1.25, -0.12), rotation: -0.16 },
    ].forEach((panel) => {
      const mesh = new THREE.Mesh(panelGeometry, panelMaterial);
      mesh.position.copy(panel.position);
      mesh.rotation.z = panel.rotation;
      group.add(mesh);
    });

    const pointer = new THREE.Vector2(0, 0);
    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) {
        return;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    let frameId = 0;
    const render = () => {
      if (!reducedMotion) {
        group.rotation.y += 0.003;
        group.rotation.x += (pointer.y * 0.08 - group.rotation.x) * 0.035;
        group.position.x += (pointer.x * 0.12 - group.position.x) * 0.035;
      }
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", handlePointerMove);
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      accentMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      panelGeometry.dispose();
      panelMaterial.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="hero-scene" ref={mountRef}>
      {showFallback ? (
        <div className="hero-scene-fallback" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </div>
  );
}
