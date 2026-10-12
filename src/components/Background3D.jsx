import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Stars Galaxy
    const particleCount = 750;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color tones: Electric Blue (#0088ff), Cyan (#00f0ff), and Silver White
    const colorChoices = [
      new THREE.Color(0x0077ff),
      new THREE.Color(0x00d2ff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x94a3b8)
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 160;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture / material
    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D floating wireframe polyhedron (developer cyber node)
    const polyGeo = new THREE.IcosahedronGeometry(22, 1);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0x0055cc,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(45, -10, -20);
    scene.add(polyMesh);

    // Second smaller companion node
    const torusGeo = new THREE.TorusGeometry(12, 1.2, 8, 32);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-50, 20, -30);
    scene.add(torusMesh);

    // Mouse movement interaction with smooth interpolation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Window resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();

        // Mouse smooth easing
        targetX += (mouseX * 12 - targetX) * 0.04;
        targetY += (-mouseY * 12 - targetY) * 0.04;

        camera.position.x = targetX;
        camera.position.y = targetY;
        camera.lookAt(scene.position);

        // Slow galactic drift
        particles.rotation.y = elapsedTime * 0.025;
        particles.rotation.x = elapsedTime * 0.01;

        polyMesh.rotation.x = elapsedTime * 0.06;
        polyMesh.rotation.y = elapsedTime * 0.08;

        torusMesh.rotation.x = elapsedTime * 0.05;
        torusMesh.rotation.z = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div className="webgl-canvas-container" ref={mountRef} aria-hidden="true" />
      <div className="bg-grid-overlay" aria-hidden="true" />
      <div className="ambient-glow-1" aria-hidden="true" />
      <div className="ambient-glow-2" aria-hidden="true" />
    </>
  );
}
