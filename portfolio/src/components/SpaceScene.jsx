import { useRef, useEffect, useCallback, useMemo } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * SpaceScene — Cinematic deep-space background
 *
 * Layers (back to front):
 * 1. Deep black gradient base
 * 2. Warm amber sun glow bleeding from top-right edge
 * 3. Starfield (3 depth layers for parallax)
 * 4. Subtle orbital ring lines (technical blueprint feel)
 * 5. Shooting stars (occasional)
 * 6. Cosmic dust wisps
 */

const rand = (min, max) => Math.random() * (max - min) + min;
const TAU = Math.PI * 2;

// ── Star factory ────────────────────────────────────────────────────────────
function createStars(w, h, count, depth) {
  return Array.from({ length: count }, () => ({
    x: rand(0, w),
    y: rand(0, h),
    r: depth === "far" ? rand(0.3, 0.8) : depth === "mid" ? rand(0.6, 1.4) : rand(1.0, 2.2),
    brightness: rand(0.3, 1),
    twinkleSpeed: rand(0.3, 2.5),
    twinkleOffset: rand(0, TAU),
    vx: (rand(-0.01, 0.01)) * (depth === "far" ? 0.2 : depth === "mid" ? 0.5 : 0.8),
    vy: (rand(-0.01, 0.01)) * (depth === "far" ? 0.2 : depth === "mid" ? 0.5 : 0.8),
    // Slight warm/cool tint
    hue: rand(0, 1) > 0.7 ? rand(200, 240) : rand(40, 60),
    saturation: rand(10, 40),
  }));
}

// ── Orbital ring definitions ────────────────────────────────────────────────
// Thin, technical-looking elliptical paths across the viewport
const ORBITAL_RINGS = [
  { cx: 0.5, cy: 0.45, rx: 0.35, ry: 0.18, tilt: -5, opacity: 0.04, width: 0.5 },
  { cx: 0.5, cy: 0.45, rx: 0.42, ry: 0.22, tilt: 8, opacity: 0.03, width: 0.5 },
  { cx: 0.5, cy: 0.45, rx: 0.50, ry: 0.26, tilt: -2, opacity: 0.025, width: 0.5 },
  { cx: 0.5, cy: 0.45, rx: 0.28, ry: 0.14, tilt: 12, opacity: 0.035, width: 0.5 },
  { cx: 0.5, cy: 0.45, rx: 0.20, ry: 0.10, tilt: -8, opacity: 0.03, width: 0.5 },
  // Asymmetric rings for depth
  { cx: 0.35, cy: 0.55, rx: 0.25, ry: 0.13, tilt: 15, opacity: 0.02, width: 0.4 },
  { cx: 0.65, cy: 0.35, rx: 0.30, ry: 0.15, tilt: -10, opacity: 0.02, width: 0.4 },
];

export default function SpaceScene() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, nx: 0, ny: 0 });
  const reducedMotion = useReducedMotion();
  const stateRef = useRef(null);

  const CONFIG = useMemo(() => ({
    farStars: 180,
    midStars: 80,
    nearStars: 35,
    shootingStarInterval: reducedMotion ? Infinity : 5000,
    parallaxStrength: 25,
  }), [reducedMotion]);

  const init = useCallback((w, h) => ({
    farStars: createStars(w, h, CONFIG.farStars, "far"),
    midStars: createStars(w, h, CONFIG.midStars, "mid"),
    nearStars: createStars(w, h, CONFIG.nearStars, "near"),
    shootingStars: [],
    lastShootingTime: 0,
    time: 0,
  }), [CONFIG]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current = init(w, h);
    };

    const handleMouse = (e) => {
      mouseRef.current.nx = (e.clientX / w - 0.5) * 2;
      mouseRef.current.ny = (e.clientY / h - 0.5) * 2;
    };

    // ── Draw: Deep black base ───────────────────────────────────────────
    const drawBase = () => {
      const bg = ctx.createRadialGradient(w * 0.7, h * 0.15, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.9);
      bg.addColorStop(0, "#0D1117");
      bg.addColorStop(0.3, "#0A0E1A");
      bg.addColorStop(0.6, "#070A12");
      bg.addColorStop(1, "#05060A");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    };

    // ── Draw: Warm sun glow from top-right edge ─────────────────────────
    const drawSunGlow = (time) => {
      const pulse = reducedMotion ? 1 : 0.9 + 0.1 * Math.sin(time * 0.4);
      // Main warm glow from top-right
      const sx = w * 0.85;
      const sy = h * 0.08;
      const maxR = Math.min(w, h) * 0.7;

      // Large outer glow
      const outerGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, maxR * pulse);
      outerGlow.addColorStop(0, "rgba(255, 140, 66, 0.08)");
      outerGlow.addColorStop(0.15, "rgba(255, 160, 80, 0.05)");
      outerGlow.addColorStop(0.35, "rgba(255, 130, 50, 0.025)");
      outerGlow.addColorStop(0.6, "rgba(255, 120, 40, 0.01)");
      outerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, w, h);

      // Tight warm core
      const core = ctx.createRadialGradient(sx, sy, 0, sx, sy, maxR * 0.25 * pulse);
      core.addColorStop(0, "rgba(255, 178, 94, 0.12)");
      core.addColorStop(0.3, "rgba(255, 140, 66, 0.06)");
      core.addColorStop(0.6, "rgba(255, 120, 50, 0.02)");
      core.addColorStop(1, "transparent");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      // Subtle warm wash across the top
      const wash = ctx.createLinearGradient(0, 0, w * 0.6, h * 0.3);
      wash.addColorStop(0, "rgba(255, 140, 66, 0.03)");
      wash.addColorStop(0.5, "rgba(255, 160, 80, 0.01)");
      wash.addColorStop(1, "transparent");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);
    };

    // ── Draw: Orbital ring lines ────────────────────────────────────────
    const drawOrbitalRings = () => {
      const mx = mouseRef.current.x * CONFIG.parallaxStrength * 0.03;
      const my = mouseRef.current.y * CONFIG.parallaxStrength * 0.03;

      for (const ring of ORBITAL_RINGS) {
        const cx = ring.cx * w + mx;
        const cy = ring.cy * h + my;
        const rx = ring.rx * w;
        const ry = ring.ry * w;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((ring.tilt * Math.PI) / 180);

        // Main ring line
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ring.opacity})`;
        ctx.lineWidth = ring.width;
        ctx.stroke();

        // Subtle glow on the ring
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
        ctx.strokeStyle = `rgba(95, 168, 211, ${ring.opacity * 0.3})`;
        ctx.lineWidth = ring.width * 3;
        ctx.stroke();

        ctx.restore();
      }

      // Dashed technical grid lines (very subtle)
      ctx.save();
      ctx.globalAlpha = 0.015;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 12]);
      // Horizontal grid
      for (let i = 0; i < 5; i++) {
        const y = h * (0.2 + i * 0.15) + my;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
    };

    // ── Draw: Star layers ───────────────────────────────────────────────
    const drawStars = (stars, time, parallaxFactor) => {
      const mx = mouseRef.current.x * CONFIG.parallaxStrength * parallaxFactor;
      const my = mouseRef.current.y * CONFIG.parallaxStrength * parallaxFactor;

      for (const s of stars) {
        if (!reducedMotion) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < -5) s.x = w + 5;
          if (s.x > w + 5) s.x = -5;
          if (s.y < -5) s.y = h + 5;
          if (s.y > h + 5) s.y = -5;
        }
        const tx = s.x + mx;
        const ty = s.y + my;
        const twinkle = reducedMotion ? 1 : 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        const alpha = twinkle * s.brightness;

        // Star glow (very subtle)
        ctx.beginPath();
        ctx.arc(tx, ty, s.r * 2.5, 0, TAU);
        ctx.fillStyle = `hsla(${s.hue}, ${s.saturation}%, 80%, ${alpha * 0.08})`;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(tx, ty, s.r, 0, TAU);
        ctx.fillStyle = `hsla(${s.hue}, ${s.saturation}%, 85%, ${alpha})`;
        ctx.fill();
      }
    };

    // ── Draw: Cosmic dust wisps ─────────────────────────────────────────
    const drawDust = () => {
      const mx = mouseRef.current.x * CONFIG.parallaxStrength * 0.05;
      const my = mouseRef.current.y * CONFIG.parallaxStrength * 0.05;

      // Subtle diagonal dust band
      ctx.save();
      ctx.translate(w * 0.3 + mx, h * 0.6 + my);
      ctx.rotate(-0.3);
      const dust = ctx.createLinearGradient(-w * 0.3, 0, w * 0.3, 0);
      dust.addColorStop(0, "transparent");
      dust.addColorStop(0.3, "rgba(95, 168, 211, 0.008)");
      dust.addColorStop(0.5, "rgba(139, 143, 154, 0.012)");
      dust.addColorStop(0.7, "rgba(95, 168, 211, 0.008)");
      dust.addColorStop(1, "transparent");
      ctx.fillStyle = dust;
      ctx.fillRect(-w * 0.3, -60, w * 0.6, 120);
      ctx.restore();
    };

    // ── Draw: Shooting stars ────────────────────────────────────────────
    const drawShootingStars = (state) => {
      if (!reducedMotion && Date.now() - state.lastShootingTime > CONFIG.shootingStarInterval) {
        if (Math.random() < 0.3) {
          const startX = rand(0, w * 0.8);
          const startY = rand(0, h * 0.3);
          const angle = rand(0.3, 0.7);
          const speed = rand(12, 20);
          state.shootingStars.push({
            x: startX, y: startY,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            length: rand(80, 180), life: 1, decay: rand(0.012, 0.025),
            width: rand(1, 2.5),
          });
        }
        state.lastShootingTime = Date.now();
      }

      for (let i = state.shootingStars.length - 1; i >= 0; i--) {
        const ss = state.shootingStars[i];
        if (!reducedMotion) {
          ss.x += ss.vx;
          ss.y += ss.vy;
          ss.life -= ss.decay;
        }
        if (ss.life <= 0 || ss.x > w + 200 || ss.y > h + 200) {
          state.shootingStars.splice(i, 1);
          continue;
        }

        const speed = Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
        const tailX = ss.x - (ss.vx / speed) * ss.length;
        const tailY = ss.y - (ss.vy / speed) * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${ss.life * 0.15})`);
        gradient.addColorStop(1, `rgba(255, 220, 180, ${ss.life * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ss.width * ss.life;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2 * ss.life, 0, TAU);
        ctx.fillStyle = `rgba(255, 240, 200, ${ss.life * 0.5})`;
        ctx.fill();
      }
    };

    // ── Main animation loop ─────────────────────────────────────────────
    let lastTime = 0;
    const animate = (timestamp) => {
      if (!stateRef.current) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;
      stateRef.current.time += dt;

      mouseRef.current.x += (mouseRef.current.nx - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.ny - mouseRef.current.y) * 0.04;

      const state = stateRef.current;
      const time = state.time;

      // Layer 1: Deep black base
      drawBase();

      // Layer 2: Warm sun glow from edge
      drawSunGlow(time);

      // Layer 3: Cosmic dust wisps
      drawDust(time);

      // Layer 4: Orbital ring lines
      drawOrbitalRings(time);

      // Layer 5: Far stars
      drawStars(state.farStars, time, 0.06);

      // Layer 6: Mid stars
      drawStars(state.midStars, time, 0.15);

      // Layer 7: Near stars
      drawStars(state.nearStars, time, 0.3);

      // Layer 8: Shooting stars
      drawShootingStars(state);

      animRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate(0);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [init, CONFIG, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas-bg"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
