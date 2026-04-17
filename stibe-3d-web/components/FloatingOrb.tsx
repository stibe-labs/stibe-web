'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function FloatingOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0e27, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create glowing sphere
    const geometry = new THREE.IcosahedronGeometry(1, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xcccccc,
      wireframe: false,
      shininess: 100,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Create wireframe effect using edges
    const edges = new THREE.EdgesGeometry(geometry);
    const wireframe = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
    );
    sphere.add(wireframe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xcccccc, 0.5, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse Tracking Logic
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      sphere.rotation.x += 0.004;
      sphere.rotation.y += 0.005;
      sphere.rotation.z += 0.002;

      // Make the orb smoothly track the cursor horizontally and vertically
      const targetX = mouseX * 1.5;
      const targetY = mouseY * 1.5;
      sphere.position.x += 0.05 * (targetX - sphere.position.x);
      sphere.position.y += 0.05 * (targetY - sphere.position.y);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
