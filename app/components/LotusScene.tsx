"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type ViewKey = "overview" | "flower" | "leaf" | "root";
type LabelKey = "flower" | "leaf" | "stem" | "root";

const viewCopy: Record<ViewKey, { label: string; title: string; body: string }> =
  {
    overview: {
      label: "Toàn cảnh",
      title: "Từ bùn sâu tới hoa nở trên mặt nước",
      body: "Sen vươn lên bằng thân rỗng, giữ lá nổi rộng và đỡ bông hoa cao khỏi mặt hồ.",
    },
    flower: {
      label: "Hoa",
      title: "Cánh mỏng ôm lấy gương sen",
      body: "Nhiều lớp cánh mở dần quanh gương sen vàng, tạo dáng thanh và nhẹ khi gặp gió.",
    },
    leaf: {
      label: "Lá",
      title: "Lá phủ sáp đẩy nước thành giọt",
      body: "Mặt lá sen hơi nhám và kỵ nước, các gân tỏa tròn giúp lá nổi vững trên mặt hồ.",
    },
    root: {
      label: "Thân rễ",
      title: "Thân rễ bám trong bùn nuôi cả cây",
      body: "Bên dưới mặt nước là thân rễ và rễ con, nơi dự trữ chất dinh dưỡng cho mùa nở hoa.",
    },
  };

const viewPresets: Record<ViewKey, { position: THREE.Vector3; target: THREE.Vector3 }> =
  {
    overview: {
      position: new THREE.Vector3(5.4, 3.2, 7.4),
      target: new THREE.Vector3(0.1, 0.8, 0),
    },
    flower: {
      position: new THREE.Vector3(2.15, 2.35, 2.85),
      target: new THREE.Vector3(0, 1.84, 0.08),
    },
    leaf: {
      position: new THREE.Vector3(-3.5, 2.2, 3.8),
      target: new THREE.Vector3(-1.3, 0.2, 1.2),
    },
    root: {
      position: new THREE.Vector3(3.2, 1.2, 4.5),
      target: new THREE.Vector3(0.2, -0.68, 0.2),
    },
  };

function createGradientTexture(
  stops: Array<[number, string]>,
  size = 256,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createLinearGradient(0, 0, size, size);
  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  context.globalAlpha = 0.18;
  for (let i = 0; i < 220; i += 1) {
    const radius = 1 + Math.random() * 4;
    context.fillStyle = i % 2 === 0 ? "#ffffff" : "#5fa7a0";
    context.beginPath();
    context.arc(Math.random() * size, Math.random() * size, radius, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(7, 7);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCausticTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.clearRect(0, 0, size, size);
  context.globalCompositeOperation = "lighter";
  for (let i = 0; i < 72; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radiusX = 34 + Math.random() * 70;
    const radiusY = 2 + Math.random() * 7;
    const angle = Math.random() * Math.PI;
    const gradient = context.createRadialGradient(x, y, 0, x, y, radiusX);
    gradient.addColorStop(0, "rgba(255, 255, 230, 0.44)");
    gradient.addColorStop(0.36, "rgba(190, 255, 230, 0.14)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.scale(1, radiusY / radiusX);
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(0, 0, radiusX, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3.2, 3.2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRippleTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const center = size / 2;
  context.clearRect(0, 0, size, size);
  for (let i = 0; i < 5; i += 1) {
    const radius = center * (0.2 + i * 0.15);
    const gradient = context.createRadialGradient(center, center, radius - 5, center, center, radius + 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.42, "rgba(255, 255, 255, 0.42)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.strokeStyle = gradient;
    context.lineWidth = 5;
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createPetalGeometry(
  length: number,
  width: number,
  lift: number,
  cup: number,
  base: string,
  tip: string,
): THREE.BufferGeometry {
  const rows = 28;
  const columns = 18;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const baseColor = new THREE.Color(base);
  const tipColor = new THREE.Color(tip);
  const rimColor = new THREE.Color("#ffe5ec");
  const blushColor = new THREE.Color("#f4a2ba");
  const veinColor = new THREE.Color("#fff8fb");

  for (let row = 0; row <= rows; row += 1) {
    const v = row / rows;
    const profile = Math.pow(Math.sin(Math.PI * v), 0.56) * (1 - v * 0.12);
    for (let column = 0; column <= columns; column += 1) {
      const u = column / columns;
      const side = u * 2 - 1;
      const taper = 1 - Math.pow(v, 3) * 0.28;
      const curl = Math.sin(v * Math.PI * 1.25) * side * 0.022;
      const x = side * width * profile * taper + curl;
      const z = length * v;
      const y =
        lift * Math.sin(Math.PI * v * 0.88) +
        cup * side * side * Math.sin(Math.PI * v) +
        0.08 * Math.pow(v, 2) -
        0.018 * (1 - Math.abs(side)) * Math.sin(Math.PI * v);
      positions.push(x, y, z);

      const color = baseColor.clone().lerp(tipColor, v * 0.86);
      color.lerp(rimColor, Math.abs(side) * 0.18);
      color.lerp(blushColor, (1 - Math.abs(side)) * Math.sin(Math.PI * v) * 0.1);
      color.lerp(veinColor, Math.exp(-Math.pow(side / 0.12, 2)) * Math.sin(Math.PI * v) * 0.14);
      colors.push(color.r, color.g, color.b);
    }
  }

  const stride = columns + 1;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const a = row * stride + column;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function petalSurfacePoint(
  length: number,
  width: number,
  lift: number,
  cup: number,
  v: number,
  side: number,
  yOffset = 0.01,
): THREE.Vector3 {
  const profile = Math.pow(Math.sin(Math.PI * v), 0.56) * (1 - v * 0.12);
  const taper = 1 - Math.pow(v, 3) * 0.28;
  const curl = Math.sin(v * Math.PI * 1.25) * side * 0.022;
  const x = side * width * profile * taper + curl;
  const z = length * v;
  const y =
    lift * Math.sin(Math.PI * v * 0.88) +
    cup * side * side * Math.sin(Math.PI * v) +
    0.08 * Math.pow(v, 2) -
    0.018 * (1 - Math.abs(side)) * Math.sin(Math.PI * v) +
    yOffset;
  return new THREE.Vector3(x, y, z);
}

function createLeaf(size: number, color: string): THREE.Group {
  const group = new THREE.Group();
  const shape = new THREE.Shape();
  const notch = 0.38;
  const segments = 110;
  shape.moveTo(0, 0);
  for (let index = 0; index <= segments; index += 1) {
    const angle = notch + ((Math.PI * 2 - notch * 2) * index) / segments;
    const ripple = 1 + Math.sin(angle * 9) * 0.018 + Math.cos(angle * 5) * 0.012;
    const radius = size * ripple;
    shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  shape.lineTo(0, 0);

  const leafGeometry = new THREE.ShapeGeometry(shape, 36);
  leafGeometry.rotateX(-Math.PI / 2);
  const leafMaterial = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.72,
    clearcoat: 0.22,
    clearcoatRoughness: 0.52,
    side: THREE.DoubleSide,
  });
  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf.receiveShadow = true;
  group.add(leaf);

  const veinMaterial = new THREE.LineBasicMaterial({
    color: "#b6d88d",
    transparent: true,
    opacity: 0.62,
  });
  for (let i = 0; i < 18; i += 1) {
    const angle = notch + 0.16 + ((Math.PI * 2 - notch * 2 - 0.32) * i) / 17;
    const points = [
      new THREE.Vector3(0, 0.015, 0),
      new THREE.Vector3(Math.cos(angle) * size * 0.88, 0.018, Math.sin(angle) * size * 0.88),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    group.add(new THREE.Line(geometry, veinMaterial));
  }

  return group;
}

function createTube(
  points: THREE.Vector3[],
  radius: number,
  material: THREE.Material,
  tubularSegments = 72,
): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, tubularSegments, radius, 12, false);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

function createScene(
  host: HTMLDivElement,
  labelRefs: MutableRefObject<Record<LabelKey, HTMLDivElement | null>>,
) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#dce9e3");
  scene.fog = new THREE.Fog("#dce9e3", 9, 24);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  camera.position.copy(viewPresets.overview.position);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  host.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.22;
  controls.minDistance = 3.3;
  controls.maxDistance = 13;
  controls.target.copy(viewPresets.overview.target);

  const ambient = new THREE.HemisphereLight("#eaf8f2", "#38543e", 2.05);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight("#fff1cf", 3.2);
  sun.position.set(-4.8, 7.5, 4.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 24;
  scene.add(sun);

  const fill = new THREE.PointLight("#f4a6bd", 1.15, 9);
  fill.position.set(2.4, 2.3, 2.5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight("#ffd8e5", 1.35);
  rim.position.set(3.8, 4.4, -4.8);
  scene.add(rim);

  const livingPlant = new THREE.Group();
  scene.add(livingPlant);

  const waterTexture = createGradientTexture([
    [0, "#5fb8aa"],
    [0.44, "#80c7bd"],
    [1, "#d7f0e2"],
  ]);
  const waterGeometry = new THREE.PlaneGeometry(24, 24, 88, 88);
  waterGeometry.rotateX(-Math.PI / 2);
  const waterPositions = waterGeometry.attributes.position as THREE.BufferAttribute;
  const waterBaseZ = new Float32Array(waterPositions.count);
  const waterSeeds = new Float32Array(waterPositions.count);
  for (let index = 0; index < waterSeeds.length; index += 1) {
    waterBaseZ[index] = waterPositions.getZ(index);
    waterSeeds[index] = Math.random() * Math.PI * 2;
  }
  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: "#79c5bd",
    map: waterTexture,
    roughness: 0.18,
    metalness: 0,
    clearcoat: 0.86,
    clearcoatRoughness: 0.12,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const water = new THREE.Mesh(
    waterGeometry,
    waterMaterial,
  );
  water.receiveShadow = true;
  scene.add(water);

  const shimmerTexture = createCausticTexture(384);
  shimmerTexture.repeat.set(4.8, 4.8);
  const shimmer = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 24, 1, 1),
    new THREE.MeshBasicMaterial({
      color: "#dcfff6",
      map: shimmerTexture,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  shimmer.rotation.x = -Math.PI / 2;
  shimmer.position.y = 0.022;
  scene.add(shimmer);

  const bed = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 24, 1, 1),
    new THREE.MeshStandardMaterial({
      color: "#756b4a",
      roughness: 0.94,
      transparent: true,
      opacity: 0.42,
    }),
  );
  bed.rotation.x = -Math.PI / 2;
  bed.position.y = -1.15;
  scene.add(bed);

  const causticTexture = createCausticTexture();
  const caustics = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18, 1, 1),
    new THREE.MeshBasicMaterial({
      color: "#e7ffe8",
      map: causticTexture,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  caustics.rotation.x = -Math.PI / 2;
  caustics.position.y = -1.125;
  scene.add(caustics);

  const reflectionGroup = new THREE.Group();
  const reflectionMaterial = new THREE.MeshBasicMaterial({
    color: "#ffd1df",
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  [
    { position: new THREE.Vector3(0.04, 0.03, -0.2), scale: new THREE.Vector3(0.62, 0.2, 1) },
    { position: new THREE.Vector3(1.38, 0.031, -0.9), scale: new THREE.Vector3(0.48, 0.14, 1) },
  ].forEach(({ position, scale }) => {
    const reflection = new THREE.Mesh(new THREE.CircleGeometry(1, 48), reflectionMaterial.clone());
    reflection.rotation.x = -Math.PI / 2;
    reflection.position.copy(position);
    reflection.scale.copy(scale);
    reflectionGroup.add(reflection);
  });
  scene.add(reflectionGroup);

  const rippleTexture = createRippleTexture();
  const rippleActors: Array<{
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    baseScale: number;
    phase: number;
    speed: number;
  }> = [];
  [
    new THREE.Vector3(0, 0.04, 0),
    new THREE.Vector3(-1.35, 0.04, 1.18),
    new THREE.Vector3(1.55, 0.04, -1.1),
    new THREE.Vector3(1.82, 0.04, 1.05),
  ].forEach((position, index) => {
    const ripple = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: "#f0fff8",
        map: rippleTexture,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    ripple.rotation.x = -Math.PI / 2;
    ripple.position.copy(position);
    scene.add(ripple);
    rippleActors.push({
      mesh: ripple,
      baseScale: 0.7 + index * 0.18,
      phase: index * 1.4,
      speed: 0.36 + index * 0.04,
    });
  });

  const floaterGroup = new THREE.Group();
  const floaterGeometry = new THREE.CircleGeometry(0.036, 10);
  const floaterMaterial = new THREE.MeshStandardMaterial({
    color: "#7ab85f",
    roughness: 0.72,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const floaterActors: Array<{
    mesh: THREE.Mesh<THREE.CircleGeometry, THREE.MeshStandardMaterial>;
    baseX: number;
    baseY: number;
    baseZ: number;
    phase: number;
    drift: number;
  }> = [];
  for (let i = 0; i < 32; i += 1) {
    const floater = new THREE.Mesh(floaterGeometry, floaterMaterial);
    const angle = i * 2.399;
    const radius = 1.6 + (i % 9) * 0.42;
    floater.position.set(Math.cos(angle) * radius - 0.7, 0.046, Math.sin(angle) * radius + 0.15);
    floater.rotation.x = -Math.PI / 2;
    floater.rotation.z = angle;
    floater.scale.set(0.55 + (i % 4) * 0.18, 0.34 + (i % 3) * 0.12, 1);
    floaterGroup.add(floater);
    floaterActors.push({
      mesh: floater,
      baseX: floater.position.x,
      baseY: floater.position.y,
      baseZ: floater.position.z,
      phase: i * 0.61,
      drift: 0.004 + (i % 5) * 0.0015,
    });
  }
  scene.add(floaterGroup);

  const stemMaterial = new THREE.MeshStandardMaterial({
    color: "#5a8f58",
    roughness: 0.68,
  });
  const rootMaterial = new THREE.MeshStandardMaterial({
    color: "#8a704d",
    roughness: 0.82,
  });

  const mainStem = createTube(
    [
      new THREE.Vector3(-0.18, -1.02, 0.02),
      new THREE.Vector3(-0.08, -0.35, 0.04),
      new THREE.Vector3(0.1, 0.62, -0.05),
      new THREE.Vector3(0, 1.52, 0),
    ],
    0.065,
    stemMaterial,
  );
  livingPlant.add(mainStem);

  const leafStem = createTube(
    [
      new THREE.Vector3(-0.35, -0.92, 0.02),
      new THREE.Vector3(-0.7, -0.16, 0.72),
      new THREE.Vector3(-1.35, 0.07, 1.18),
    ],
    0.05,
    stemMaterial,
  );
  livingPlant.add(leafStem);

  const sideStem = createTube(
    [
      new THREE.Vector3(0.2, -0.95, -0.12),
      new THREE.Vector3(0.75, -0.2, -0.78),
      new THREE.Vector3(1.55, 1.02, -1.1),
    ],
    0.044,
    stemMaterial,
  );
  livingPlant.add(sideStem);

  const rootGroup = new THREE.Group();
  const rootBase = createTube(
    [
      new THREE.Vector3(-1.15, -1.1, -0.1),
      new THREE.Vector3(-0.46, -1.02, 0.06),
      new THREE.Vector3(0.26, -1.07, 0.02),
      new THREE.Vector3(1.22, -1.12, -0.18),
    ],
    0.09,
    rootMaterial,
    58,
  );
  rootGroup.add(rootBase);
  for (let i = 0; i < 16; i += 1) {
    const side = i % 2 === 0 ? 1 : -1;
    const x = -0.95 + i * 0.13;
    rootGroup.add(
      createTube(
        [
          new THREE.Vector3(x, -1.07, 0.01),
          new THREE.Vector3(x + side * 0.18, -1.22, 0.18 + Math.sin(i) * 0.12),
          new THREE.Vector3(x + side * 0.42, -1.27, 0.36 + Math.cos(i) * 0.14),
        ],
        0.012,
        rootMaterial,
        12,
      ),
    );
  }
  livingPlant.add(rootGroup);

  const mainLeaf = createLeaf(1.28, "#4f934f");
  mainLeaf.position.set(-1.35, 0.07, 1.18);
  mainLeaf.rotation.y = -0.42;
  livingPlant.add(mainLeaf);

  const backLeaf = createLeaf(0.92, "#6da85c");
  backLeaf.position.set(1.82, 0.06, 1.05);
  backLeaf.rotation.y = 0.86;
  livingPlant.add(backLeaf);

  const smallLeaf = createLeaf(0.74, "#5d9e65");
  smallLeaf.position.set(-2.1, 0.05, -0.9);
  smallLeaf.rotation.y = 1.35;
  livingPlant.add(smallLeaf);

  const bloom = new THREE.Group();
  bloom.position.set(0, 1.52, 0);
  livingPlant.add(bloom);

  const bloomGlow = new THREE.PointLight("#ffd1df", 0.58, 3.4);
  bloomGlow.position.set(0, 0.32, 0.08);
  bloom.add(bloomGlow);

  const petalMaterial = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    vertexColors: true,
    roughness: 0.5,
    clearcoat: 0.24,
    clearcoatRoughness: 0.38,
    emissive: "#c97991",
    emissiveIntensity: 0.15,
  });
  const dewdropGeometry = new THREE.SphereGeometry(0.022, 18, 12);
  const dewdropMaterial = new THREE.MeshPhysicalMaterial({
    color: "#f8ffff",
    roughness: 0.02,
    metalness: 0,
    transparent: true,
    opacity: 0.62,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
  });
  const petalActors: Array<{
    pivot: THREE.Group;
    pitch: THREE.Group;
    basePitch: number;
    phase: number;
    amplitude: number;
  }> = [];

  function addPetalLayer(
    count: number,
    length: number,
    width: number,
    lift: number,
    cup: number,
    basePitch: number,
    height: number,
    offset: number,
    baseColor: string,
    tipColor: string,
  ) {
    for (let i = 0; i < count; i += 1) {
      const angle = offset + (i / count) * Math.PI * 2;
      const pivot = new THREE.Group();
      const pitch = new THREE.Group();
      const mesh = new THREE.Mesh(
        createPetalGeometry(length, width, lift, cup, baseColor, tipColor),
        petalMaterial.clone(),
      );
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      if (length > 0.64 && i % 3 === 0) {
        const dropCount = length > 1 ? 2 : 1;
        for (let dropIndex = 0; dropIndex < dropCount; dropIndex += 1) {
          const side = Math.sin(i * 1.37 + dropIndex) * 0.42;
          const v = 0.38 + ((i + dropIndex * 5) % 7) * 0.055;
          const drop = new THREE.Mesh(dewdropGeometry, dewdropMaterial);
          drop.position.copy(petalSurfacePoint(length, width, lift, cup, v, side, 0.035));
          drop.scale.setScalar(0.52 + ((i + dropIndex) % 3) * 0.14);
          drop.castShadow = false;
          pitch.add(drop);
        }
      }
      pitch.rotation.x = basePitch + Math.sin(i * 1.7) * 0.035;
      pitch.rotation.z = Math.sin(i * 2.3) * 0.025;
      pivot.position.y = height;
      pivot.rotation.y = angle;
      pitch.add(mesh);
      pivot.add(pitch);
      bloom.add(pivot);
      petalActors.push({
        pivot,
        pitch,
        basePitch: pitch.rotation.x,
        phase: i * 0.71 + count,
        amplitude: 0.018 + Math.random() * 0.026,
      });
    }
  }

  const sepalMaterial = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    vertexColors: true,
    color: "#5d9a5c",
    roughness: 0.68,
    clearcoat: 0.14,
  });
  for (let i = 0; i < 12; i += 1) {
    const pivot = new THREE.Group();
    const pitch = new THREE.Group();
    const sepal = new THREE.Mesh(
      createPetalGeometry(0.52, 0.09, 0.035, 0.025, "#3e824c", "#c1d979"),
      sepalMaterial.clone(),
    );
    sepal.castShadow = true;
    pitch.rotation.x = 0.78 + Math.sin(i) * 0.04;
    pitch.rotation.z = Math.sin(i * 2.1) * 0.03;
    pivot.position.y = -0.05;
    pivot.rotation.y = (i / 12) * Math.PI * 2 + 0.12;
    pitch.add(sepal);
    pivot.add(pitch);
    bloom.add(pivot);
  }

  addPetalLayer(18, 1.24, 0.3, 0.18, 0.1, 0.52, 0, 0.02, "#e36f99", "#fff5f3");
  addPetalLayer(15, 1.02, 0.25, 0.25, 0.13, 0.12, 0.1, 0.2, "#ec86a8", "#fff8f6");
  addPetalLayer(12, 0.78, 0.2, 0.31, 0.15, -0.3, 0.17, 0.04, "#f2a9bb", "#fffaf7");
  addPetalLayer(8, 0.55, 0.15, 0.34, 0.18, -0.72, 0.23, 0.26, "#f7c6d0", "#fffdf8");
  addPetalLayer(5, 0.38, 0.11, 0.31, 0.16, -1.03, 0.28, 0.08, "#fadddf", "#fffefa");

  const receptacle = new THREE.Mesh(
    new THREE.SphereGeometry(0.21, 48, 26),
    new THREE.MeshStandardMaterial({
      color: "#e7bf48",
      roughness: 0.55,
      emissive: "#8b6416",
      emissiveIntensity: 0.1,
    }),
  );
  receptacle.scale.set(1.12, 0.46, 1.12);
  receptacle.position.set(0, 0.3, 0.02);
  receptacle.castShadow = true;
  bloom.add(receptacle);

  const seedMaterial = new THREE.MeshStandardMaterial({
    color: "#7a5b1a",
    roughness: 0.72,
    emissive: "#2d2107",
    emissiveIntensity: 0.12,
  });
  const seedSpots = [
    new THREE.Vector3(0, 0.405, 0.02),
    ...Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2 + 0.2;
      return new THREE.Vector3(Math.cos(angle) * 0.09, 0.398, Math.sin(angle) * 0.09 + 0.02);
    }),
    ...Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * 0.155, 0.382, Math.sin(angle) * 0.155 + 0.02);
    }),
  ];
  seedSpots.forEach((position, index) => {
    const seed = new THREE.Mesh(new THREE.SphereGeometry(0.018 + (index % 3) * 0.003, 12, 8), seedMaterial);
    seed.position.copy(position);
    seed.scale.y = 0.36;
    bloom.add(seed);
  });

  const stamenMaterial = new THREE.MeshStandardMaterial({
    color: "#ffd36b",
    roughness: 0.46,
    emissive: "#9d6315",
    emissiveIntensity: 0.09,
  });
  for (let i = 0; i < 46; i += 1) {
    const angle = (i / 46) * Math.PI * 2;
    const radius = 0.19 + (i % 4) * 0.024;
    const height = 0.2 + (i % 5) * 0.018;
    const stamen = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.01, height, 8), stamenMaterial);
    stamen.position.set(Math.cos(angle) * radius, 0.22, Math.sin(angle) * radius);
    stamen.rotation.z = Math.cos(angle) * 0.35;
    stamen.rotation.x = Math.sin(angle) * 0.35;
    bloom.add(stamen);

    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 8), stamenMaterial);
    dot.position.set(Math.cos(angle) * radius * 1.08, 0.32 + height * 0.45, Math.sin(angle) * radius * 1.08);
    bloom.add(dot);
  }

  const bud = new THREE.Group();
  bud.position.set(1.55, 1.02, -1.1);
  for (let i = 0; i < 8; i += 1) {
    const pivot = new THREE.Group();
    const petal = new THREE.Mesh(
      createPetalGeometry(0.62, 0.13, 0.22, 0.1, "#dd638b", "#fff2f5"),
      petalMaterial.clone(),
    );
    pivot.rotation.y = (i / 8) * Math.PI * 2;
    pivot.rotation.x = -0.82;
    pivot.add(petal);
    bud.add(pivot);
  }
  bud.rotation.z = -0.18;
  livingPlant.add(bud);

  const motesGeometry = new THREE.BufferGeometry();
  const motePositions: number[] = [];
  const moteSeeds: number[] = [];
  for (let i = 0; i < 180; i += 1) {
    motePositions.push(
      (Math.random() - 0.5) * 7.2,
      0.28 + Math.random() * 2.5,
      (Math.random() - 0.5) * 6.8,
    );
    moteSeeds.push(Math.random() * Math.PI * 2);
  }
  motesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(motePositions, 3));
  const motes = new THREE.Points(
    motesGeometry,
    new THREE.PointsMaterial({
      color: "#ffe9a7",
      size: 0.025,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    }),
  );
  scene.add(motes);

  const labelTargets: Record<LabelKey, THREE.Object3D> = {
    flower: bloom,
    leaf: mainLeaf,
    stem: mainStem,
    root: rootGroup,
  };

  const startedAt = performance.now();
  const pointer = new THREE.Vector2(0, 0);
  const desiredCamera = viewPresets.overview.position.clone();
  const desiredTarget = viewPresets.overview.target.clone();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let focusedView: ViewKey = "overview";
  controls.autoRotate = !reducedMotion;

  function resize() {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
  }

  function updateLabels() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    const screenPosition = new THREE.Vector3();
    (Object.keys(labelTargets) as LabelKey[]).forEach((key) => {
      const element = labelRefs.current[key];
      if (!element) return;
      labelTargets[key].getWorldPosition(screenPosition);
      if (key === "flower") screenPosition.y += focusedView === "flower" ? 0.62 : 0.34;
      if (key === "leaf") screenPosition.y += 0.12;
      if (key === "stem") screenPosition.y += 0.65;
      if (key === "root") screenPosition.y += 0.12;
      screenPosition.project(camera);
      const x = (screenPosition.x * 0.5 + 0.5) * width;
      const y = (-screenPosition.y * 0.5 + 0.5) * height;
      const clearOfInfoPanel = !(width > 760 && x < 470 && y < 555);
      const visible =
        screenPosition.z < 1 &&
        screenPosition.z > -1 &&
        x > 76 &&
        x < width - 76 &&
        y > 42 &&
        y < height - 128 &&
        (focusedView === "overview" ||
          (focusedView === "flower" && key === "flower") ||
          (focusedView === "leaf" && key === "leaf") ||
          (focusedView === "root" && (key === "root" || key === "stem"))) &&
        clearOfInfoPanel;
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      element.style.opacity = visible ? "1" : "0";
    });
  }

  const onPointerMove = (event: PointerEvent) => {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  let frameId = 0;
  function animate() {
    const elapsed = (performance.now() - startedAt) / 1000;
    const plantSway = reducedMotion ? 0 : Math.sin(elapsed * 0.74) * 0.018;
    livingPlant.rotation.z = plantSway + pointer.x * 0.012;
    livingPlant.rotation.x = pointer.y * 0.008;
    sun.position.x = -4.8 + Math.sin(elapsed * 0.22) * 0.45;
    fill.intensity = 0.86 + Math.sin(elapsed * 0.9) * 0.08;

    for (let index = 0; index < waterPositions.count; index += 1) {
      const x = waterPositions.getX(index);
      const z = waterBaseZ[index];
      const stemRipple =
        Math.sin(Math.hypot(x, z) * 4.8 - elapsed * 2.1) * 0.007 +
        Math.sin(Math.hypot(x + 1.35, z - 1.18) * 5.4 - elapsed * 2.35) * 0.004;
      const wave =
        Math.sin(x * 1.35 + elapsed * 1.1 + waterSeeds[index]) * 0.018 +
        Math.cos(z * 1.68 + elapsed * 0.82) * 0.014 +
        stemRipple;
      waterPositions.setY(index, reducedMotion ? 0 : wave);
    }
    waterPositions.needsUpdate = true;
    waterGeometry.computeVertexNormals();
    waterTexture.offset.x = elapsed * 0.006;
    waterTexture.offset.y = Math.sin(elapsed * 0.18) * 0.012;
    shimmerTexture.offset.x = elapsed * 0.018;
    shimmerTexture.offset.y = -elapsed * 0.012;
    causticTexture.offset.x = -elapsed * 0.01;
    causticTexture.offset.y = elapsed * 0.014;
    waterMaterial.opacity = reducedMotion ? 0.78 : 0.76 + Math.sin(elapsed * 0.42) * 0.025;

    reflectionGroup.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
      mesh.material.opacity = reducedMotion ? 0.08 : 0.075 + Math.sin(elapsed * 0.8 + index) * 0.018;
      mesh.scale.x = (index === 0 ? 0.62 : 0.48) + Math.sin(elapsed * 0.5 + index) * 0.025;
    });
    rippleActors.forEach((actor) => {
      const cycle = (elapsed * actor.speed + actor.phase) % 1;
      const scale = actor.baseScale + cycle * 0.8;
      actor.mesh.scale.set(scale, scale, 1);
      actor.mesh.material.opacity = reducedMotion ? 0.1 : (1 - cycle) * 0.16;
      actor.mesh.rotation.z = elapsed * 0.06 + actor.phase;
    });
    floaterActors.forEach((actor) => {
      actor.mesh.position.y = actor.baseY + (reducedMotion ? 0 : Math.sin(elapsed * 1.15 + actor.phase) * 0.008);
      actor.mesh.position.x = actor.baseX + (reducedMotion ? 0 : Math.sin(elapsed * 0.35 + actor.phase) * actor.drift * 14);
      actor.mesh.position.z = actor.baseZ + (reducedMotion ? 0 : Math.cos(elapsed * 0.28 + actor.phase) * actor.drift * 10);
      actor.mesh.rotation.z += reducedMotion ? 0 : 0.0015 + actor.drift * 0.08;
    });

    petalActors.forEach((actor) => {
      actor.pitch.rotation.x =
        actor.basePitch + (reducedMotion ? 0 : Math.sin(elapsed * 0.95 + actor.phase) * actor.amplitude);
      actor.pivot.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 0.62 + actor.phase) * 0.012;
    });
    bloom.rotation.y = reducedMotion ? 0.04 : Math.sin(elapsed * 0.2) * 0.06;
    bud.rotation.y = reducedMotion ? 0 : Math.sin(elapsed * 0.35) * 0.05;
    mainLeaf.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 0.6) * 0.016;
    backLeaf.rotation.z = reducedMotion ? 0 : Math.cos(elapsed * 0.54) * 0.014;

    const positions = motesGeometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < positions.count; i += 1) {
      const seed = moteSeeds[i];
      positions.setY(i, 0.28 + ((positions.getY(i) - 0.28 + 0.0025 + Math.sin(elapsed + seed) * 0.0008) % 2.5));
      positions.setX(i, positions.getX(i) + Math.sin(elapsed * 0.5 + seed) * 0.0007);
    }
    positions.needsUpdate = true;

    camera.position.lerp(desiredCamera, 0.025);
    controls.target.lerp(desiredTarget, 0.034);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  }
  animate();

  return {
    setView(view: ViewKey) {
      focusedView = view;
      desiredCamera.copy(viewPresets[view].position);
      desiredTarget.copy(viewPresets[view].target);
    },
    dispose() {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      controls.dispose();
      host.removeChild(renderer.domElement);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else if (material) {
          material.dispose();
        }
      });
      waterTexture.dispose();
      shimmerTexture.dispose();
      causticTexture.dispose();
      rippleTexture.dispose();
      renderer.dispose();
    },
  };
}

export default function LotusScene() {
  const [activeView, setActiveView] = useState<ViewKey>("overview");
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneApi = useRef<ReturnType<typeof createScene> | null>(null);
  const labelRefs = useRef<Record<LabelKey, HTMLDivElement | null>>({
    flower: null,
    leaf: null,
    stem: null,
    root: null,
  });

  useEffect(() => {
    if (!mountRef.current) return undefined;
    sceneApi.current = createScene(mountRef.current, labelRefs);
    return () => {
      sceneApi.current?.dispose();
      sceneApi.current = null;
    };
  }, []);

  useEffect(() => {
    sceneApi.current?.setView(activeView);
  }, [activeView]);

  const activeCopy = viewCopy[activeView];

  return (
    <section className="lotus-shell" aria-label="Mô phỏng 3D cây hoa sen">
      <div ref={mountRef} className="lotus-canvas" />
      <div className="lotus-depth" aria-hidden="true" />

      <aside className="lotus-info">
        <p className="lotus-kicker">Nelumbo nucifera</p>
        <h1>Cây hoa sen 3D</h1>
        <p className="lotus-lede">
          Một lát cắt sống động của cây sen: nước lăn tăn phản chiếu, lá nổi trên mặt hồ, thân vươn
          từ bùn và hoa mở sáng phía trên.
        </p>

        <div className="lotus-current" aria-live="polite">
          <strong>{activeCopy.title}</strong>
          <span>{activeCopy.body}</span>
        </div>

        <dl className="lotus-facts">
          <div>
            <dt>Lá</dt>
            <dd>Phiến tròn, gân tỏa tâm, bề mặt kỵ nước.</dd>
          </div>
          <div>
            <dt>Thân</dt>
            <dd>Rỗng khí, mềm và cao để đưa hoa lên khỏi mặt hồ.</dd>
          </div>
          <div>
            <dt>Rễ</dt>
            <dd>Dự trữ dinh dưỡng trong bùn và neo cây khi nước lay động.</dd>
          </div>
          <div>
            <dt>Nước</dt>
            <dd>Gợn sóng, vệt sáng caustic và bèo nhỏ tạo cảm giác hồ nông.</dd>
          </div>
        </dl>
      </aside>

      <div className="lotus-controls" role="group" aria-label="Góc quan sát">
        {(Object.keys(viewCopy) as ViewKey[]).map((view) => (
          <button
            key={view}
            type="button"
            className={activeView === view ? "is-active" : ""}
            aria-pressed={activeView === view}
            onClick={() => setActiveView(view)}
          >
            {viewCopy[view].label}
          </button>
        ))}
      </div>

      <div
        ref={(node) => {
          labelRefs.current.flower = node;
        }}
        className="lotus-label"
      >
        Hoa sen
      </div>
      <div
        ref={(node) => {
          labelRefs.current.leaf = node;
        }}
        className="lotus-label"
      >
        Lá nổi
      </div>
      <div
        ref={(node) => {
          labelRefs.current.stem = node;
        }}
        className="lotus-label"
      >
        Thân rỗng
      </div>
      <div
        ref={(node) => {
          labelRefs.current.root = node;
        }}
        className="lotus-label"
      >
        Thân rễ
      </div>
    </section>
  );
}
