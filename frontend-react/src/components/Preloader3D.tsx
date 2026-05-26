import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, RenderPass, UnrealBloomPass } from 'three-stdlib';
import { gsap } from 'gsap';

interface Preloader3DProps {
  onComplete: () => void;
}

const Preloader3D: React.FC<Preloader3DProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // --- Strict Fullscreen Initialization ---
    const getViewportSize = () => ({
      w: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      h: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    });

    let { w, h } = getViewportSize();

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance",
      alpha: true 
    });
    
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Force canvas to fill container perfectly
    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    
    containerRef.current.appendChild(canvas);

    // --- Post Processing ---
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0, 0.4, 0.85);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // --- Particles ---
    const particleCount = 4000; // Increased density
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Very wide spread to ensure overflow coverage
      positions[i * 3] = (Math.random() - 0.5) * 40; 
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20;
      velocities[i] = 0.01 + Math.random() * 0.04;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00FF66,
      size: 0.03,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Animation Timeline ---
    const animState = {
      speed: 0.5,
      bloom: 0,
      opacity: 0,
    };

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        // Trigger reveal at the very end of the flash
      }
    });

    tl.to(loadingTextRef.current, { opacity: 0, duration: 0.4 });
    tl.to(animState, { opacity: 1, duration: 1.2, onUpdate: () => (material.opacity = animState.opacity) });
    tl.to(animState, { 
      speed: 45, 
      bloom: 4, 
      duration: 3, 
      ease: "expo.in",
      onUpdate: () => (bloomPass.strength = animState.bloom)
    });
    tl.to(points.rotation, { z: Math.PI * 6, duration: 3.5, ease: "none" }, "-=2.5");
    
    // IMPACT FLASH - THE REVEAL MOMENT
    tl.to(animState, {
      bloom: 40, // Extreme bloom
      duration: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        bloomPass.strength = animState.bloom;
        const flashColor = new THREE.Color(0xFFFFFF).lerp(new THREE.Color(0x00FF66), 0.2);
        scene.background = flashColor;
      },
      onComplete: () => {
        // TRIGGER WEBSITE REVEAL AT PEAK BLOOM
        onComplete();
      }
    });

    // FADE OUT PRELOADER WHILE WEBSITE FADES IN BEHIND
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    });

    // --- Render Loop ---
    let frameId: number;
    let initialized = false;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const posArr = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 2] += velocities[i] * animState.speed;
        if (posArr[i * 3 + 2] > 10) {
          posArr[i * 3 + 2] = -30;
          if (animState.speed > 10) {
            const a = Math.random() * Math.PI * 2;
            const r = 0.8 + Math.random() * 0.8;
            posArr[i * 3] = Math.cos(a) * r;
            posArr[i * 3 + 1] = Math.sin(a) * r;
          } else {
            posArr[i * 3] = (Math.random() - 0.5) * 40;
            posArr[i * 3 + 1] = (Math.random() - 0.5) * 40;
          }
        }
      }
      geometry.attributes.position.needsUpdate = true;
      composer.render();

      if (!initialized) {
        initialized = true;
        // Immediate double-check of size
        const size = getViewportSize();
        camera.aspect = size.w / size.h;
        camera.updateProjectionMatrix();
        renderer.setSize(size.w, size.h);
        composer.setSize(size.w, size.h);
        tl.play();
      }
    };
    animate();

    const handleResize = () => {
      const size = getViewportSize();
      camera.aspect = size.w / size.h;
      camera.updateProjectionMatrix();
      renderer.setSize(size.w, size.h);
      composer.setSize(size.w, size.h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: '#000000',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}
    >
      <div 
        ref={loadingTextRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#00FF66',
          fontFamily: 'monospace',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          fontSize: '12px',
          zIndex: 10
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          border: '2px solid #00FF66',
          borderRadius: '50%',
          borderTopColor: 'transparent',
          margin: '0 auto 20px auto',
          animation: 'spin 1s linear infinite'
        }} />
        Initializing Campus OS...
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
};

export default Preloader3D;
