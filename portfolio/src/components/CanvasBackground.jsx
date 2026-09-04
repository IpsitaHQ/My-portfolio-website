import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * CanvasBackground — A lightweight particle constellation effect on <canvas>.
 * Replaces the need for Three.js / React Three Fiber for this use case.
 *
 * HOW IT WORKS:
 * - Draws N particles floating in space, connected by lines when close enough
 * - Particles gently drift; connections react subtly to cursor position
 * - On mobile (<768px), particle count is halved for performance
 * - Respects prefers-reduced-motion by freezing particles entirely
 *
 * TO SWAP FOR A FULL 3D SCENE:
 * 1. Install three + @react-three/fiber + @react-three/drei
 * 2. Replace this component with a <Canvas> containing your scene
 * 3. Keep the same container: <section id="canvas-bg">
 */
export default function CanvasBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const PARTICLE_COUNT_BASE = 80;
  const CONNECTION_DISTANCE = 150;
  const MOUSE_RADIUS = 200;

  const getParticleCount = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? Math.floor(PARTICLE_COUNT_BASE / 2) : PARTICLE_COUNT_BASE;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particles = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      setDimensions({ w, h });
      initParticles(w, h);
    };

    const initParticles = (w, h) => {
      const count = getParticleCount();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        // Random pastel-ish color from our palette
        hue: 240 + Math.random() * 100, // indigo → pink range
      }));
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles (skip if reduced motion)
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off edges
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, 0.8)`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(260, 60%, 70%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction — subtle push away
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < MOUSE_RADIUS && !reducedMotion) {
          const force = (MOUSE_RADIUS - distM) / MOUSE_RADIUS * 0.02;
          p.vx += (dxm / distM) * force;
          p.vy += (dym / distM) * force;
          // Dampen velocity
          p.vx *= 0.99;
          p.vy *= 0.99;
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [reducedMotion, getParticleCount]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas-bg"
      aria-hidden="true"
      // Subtle gradient overlay behind the canvas for depth
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)",
      }}
    />
  );
}
