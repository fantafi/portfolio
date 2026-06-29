"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ServiceOrbitSceneProps = {
  ariaLabel: string;
};

const orbitNodes = [
  { label: "Web App", color: 0x147a70, angle: 0 },
  { label: "Mobile App", color: 0x38bdf8, angle: (Math.PI * 2) / 3 },
  { label: "AI Tooling", color: 0xf2b84b, angle: (Math.PI * 4) / 3 },
];

export default function ServiceOrbitScene({
  ariaLabel,
}: ServiceOrbitSceneProps) {
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

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!window.WebGLRenderingContext) {
      return showFallbackOnNextFrame();
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    const keyLight = new THREE.DirectionalLight(0xe4fff8, 2.2);
    keyLight.position.set(3, 2.4, 4);
    scene.add(ambientLight, keyLight);

    const ringGeometry = new THREE.TorusGeometry(1.72, 0.01, 16, 120);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x9ecdc2,
      opacity: 0.5,
      transparent: true,
    });

    [0, 0.55, -0.55].forEach((rotation) => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = 1.15;
      ring.rotation.y = rotation;
      group.add(ring);
    });

    const coreGeometry = new THREE.IcosahedronGeometry(0.34, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x147a70,
      emissiveIntensity: 0.1,
      metalness: 0.08,
      roughness: 0.28,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.18, 2);
    const nodeMeshes = orbitNodes.map((node) => {
      const material = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.08,
        metalness: 0.06,
        roughness: 0.34,
      });
      const mesh = new THREE.Mesh(nodeGeometry, material);
      group.add(mesh);
      return { ...node, material, mesh };
    });

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
      const elapsed = performance.now() * 0.001;
      nodeMeshes.forEach((node, index) => {
        const angle = node.angle + (reducedMotion ? 0 : elapsed * 0.42);
        const radius = 1.72;
        node.mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle + index * 0.45) * 0.38,
          Math.sin(angle) * radius * 0.38,
        );
      });

      if (!reducedMotion) {
        group.rotation.y += 0.003;
        core.rotation.x += 0.006;
        core.rotation.y += 0.004;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      nodeGeometry.dispose();
      nodeMeshes.forEach((node) => node.material.dispose());
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className="service-orbit-scene"
      ref={mountRef}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="service-orbit-labels" aria-hidden="true">
        {orbitNodes.map((node) => (
          <span key={node.label}>{node.label}</span>
        ))}
      </div>
      {showFallback ? (
        <div className="service-orbit-fallback" aria-hidden="true">
          {orbitNodes.map((node) => (
            <span key={node.label}>{node.label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
