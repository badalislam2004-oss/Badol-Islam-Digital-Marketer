"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DProps {
  mouseX: number;
  mouseY: number;
}

export default function Hero3D({ mouseX, mouseY }: Hero3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Update mouse ref without re-running the Three.js effect
  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hero = canvas.parentElement;
    if (!hero) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 4.5, 17);
    camera.lookAt(0, 1.5, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd9f99d, 1.1);
    dirLight.position.set(6, 10, 8);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x34d399, 1.5, 45);
    pointLight.position.set(-6, 3, 6);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    // Bars
    const bars: [THREE.Mesh, number, number][] = [];
    const N = 5;
    const barGeo = new THREE.BoxGeometry(0.85, 1, 0.85);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.3 + ((i + j) / (2 * N)) * 0.12, 0.7, 0.42),
          metalness: 0.35,
          roughness: 0.3,
        });
        const m = new THREE.Mesh(barGeo, mat);
        m.position.set((i - 2) * 1.15, 0, (j - 2) * 1.15);
        group.add(m);
        bars.push([m, i, j]);
      }
    }

    // Upward trend curve tube and arrow
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 6; k++) {
      pts.push(
        new THREE.Vector3(
          -3.4 + k * 1.15,
          2 + k * 0.85 + Math.sin(k * 1.3) * 0.4,
          -1.5 + k * 0.3
        )
      );
    }

    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xbef264,
      emissive: 0x65a30d,
      emissiveIntensity: 0.9,
    });
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.08, 8);
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    group.add(tubeMesh);

    const arrowGeo = new THREE.ConeGeometry(0.28, 0.65, 16);
    const arrowMesh = new THREE.Mesh(arrowGeo, tubeMat);
    arrowMesh.position.copy(pts[6]);
    arrowMesh.rotation.z = -0.95;
    group.add(arrowMesh);

    // Floating Coins
    const coins: THREE.Mesh[] = [];
    const coinGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x064e3b,
      emissiveIntensity: 0.4,
    });
    for (let k = 0; k < 7; k++) {
      const coin = new THREE.Mesh(coinGeo, coinMat);
      coin.position.set(
        (Math.random() - 0.5) * 14,
        Math.random() * 7 + 1,
        (Math.random() - 0.5) * 8
      );
      coin.rotation.x = Math.PI / 2;
      coin.userData = {
        y: coin.position.y,
        p: Math.random() * 6,
        sp: 0.5 + Math.random(),
      };
      group.add(coin);
      coins.push(coin);
    }

    // Particles
    const partGeo = new THREE.BufferGeometry();
    const partCoords: number[] = [];
    for (let k = 0; k < 400; k++) {
      partCoords.push(
        (Math.random() - 0.5) * 30,
        Math.random() * 14 - 2,
        (Math.random() - 0.5) * 20
      );
    }
    partGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(partCoords, 3)
    );
    const partMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.06,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    const handleResize = () => {
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w/h;
      camera.updateProjectionMatrix();
      const isDesktop = w > 860;
      group.position.set(isDesktop ? 4.2 : 0, isDesktop ? -1 : -0.5, 0);
      group.scale.setScalar(isDesktop ? 1 : 0.65);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(hero);

    let animId = 0;
    let t = 0;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      if (!isVisible) return;
      t += 0.016;

      bars.forEach(([bar, i, j]) => {
        const height =
          1 + i * 0.55 + (Math.sin(t * 1.4 + i + j) + 1) * 0.45;
        bar.scale.y = height;
        bar.position.y = height / 2;
      });

      coins.forEach((coin) => {
        coin.position.y =
          coin.userData.y +
          Math.sin(t * coin.userData.sp + coin.userData.p) * 0.6;
        coin.rotation.z += 0.02;
      });

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      group.rotation.y = -0.5 + Math.sin(t * 0.3) * 0.15 + mx * 0.5;
      group.rotation.x = my * 0.15;
      particles.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      barGeo.dispose();
      tubeGeo.dispose();
      arrowGeo.dispose();
      coinGeo.dispose();
      partGeo.dispose();
      partMat.dispose();
      tubeMat.dispose();
      coinMat.dispose();
    };
  }, []);

  return <canvas id="bg3d" ref={canvasRef} aria-hidden="true" />;
}
