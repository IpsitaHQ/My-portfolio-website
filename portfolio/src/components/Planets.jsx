import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Planets — Cinematic 3D planet system matching reference images:
 * - Realistic textured surfaces with dramatic sun-lit lighting
 * - Central sun illumination (one side bright, one side dark)
 * - Multi-band Saturn rings with Cassini division
 * - Dense asteroid belt particles
 * - Mouse-reactive parallax at different depth layers
 * - Scroll-reactive vertical drift
 * - Orbital path animations
 */

// ─── Planet Data ────────────────────────────────────────────────────────────
const PLANETS = [
  {
    id: "mercury",
    name: "Mercury",
    size: 16,
    colors: { base: "#6a5a4a", mid: "#9a8a7a", light: "#c0b0a0", bright: "#d8c8b8" },
    glowColor: "180, 170, 150",
    orbit: { radiusX: 100, radiusY: 50, speed: 20, startAngle: 45 },
    float: { amplitude: 3, speed: 2.8 },
    position: { x: "7%", y: "32%" },
    parallaxFactor: 0.12,
    depth: "far",
    mobileHide: true,
  },
  {
    id: "venus",
    name: "Venus",
    size: 26,
    colors: { base: "#8a5a20", mid: "#c08030", light: "#e0a040", bright: "#f0c868" },
    glowColor: "240, 180, 80",
    orbit: { radiusX: 140, radiusY: 70, speed: 28, startAngle: 180 },
    float: { amplitude: 5, speed: 2.0 },
    position: { x: "92%", y: "38%" },
    parallaxFactor: 0.18,
    depth: "far",
    mobileHide: true,
  },
  {
    id: "earth",
    name: "Earth",
    size: 32,
    colors: { base: "#1a4a3f", mid: "#2d7a5e", light: "#3ba3c9", bright: "#60d0e8" },
    glowColor: "92, 200, 240",
    orbit: { radiusX: 180, radiusY: 90, speed: 35, startAngle: 90 },
    float: { amplitude: 6, speed: 1.6 },
    position: { x: "12%", y: "68%" },
    parallaxFactor: 0.25,
    depth: "mid",
    mobileHide: false,
    hasMoon: true,
    moon: { size: 7, distance: 24, speed: 5, color: "#c0c0c0" },
    surfaceDetail: "earth",
  },
  {
    id: "mars",
    name: "Mars",
    size: 24,
    colors: { base: "#6a2a08", mid: "#b14410", light: "#d46530", bright: "#e88850" },
    glowColor: "210, 100, 50",
    orbit: { radiusX: 220, radiusY: 110, speed: 40, startAngle: 310 },
    float: { amplitude: 5, speed: 2.2 },
    position: { x: "85%", y: "15%" },
    parallaxFactor: 0.3,
    depth: "mid",
    mobileHide: false,
    surfaceDetail: "mars",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    size: 65,
    colors: { base: "#5a3018", mid: "#8a5830", light: "#c09060", bright: "#e0b888" },
    glowColor: "200, 150, 80",
    orbit: { radiusX: 300, radiusY: 150, speed: 55, startAngle: 30 },
    float: { amplitude: 8, speed: 0.9 },
    position: { x: "90%", y: "58%" },
    parallaxFactor: 0.4,
    depth: "near",
    mobileHide: true,
    surfaceDetail: "bands",
    hasMoon: true,
    moon: { size: 5, distance: 45, speed: 4, color: "#d4c090" },
  },
  {
    id: "saturn",
    name: "Saturn",
    size: 50,
    colors: { base: "#8a6838", mid: "#b89050", light: "#d8b870", bright: "#f0d898" },
    glowColor: "220, 194, 120",
    ring: true,
    orbit: { radiusX: 380, radiusY: 190, speed: 70, startAngle: 200 },
    float: { amplitude: 10, speed: 0.65 },
    position: { x: "72%", y: "70%" },
    parallaxFactor: 0.45,
    depth: "near",
    mobileHide: true,
    surfaceDetail: "bands",
  },
  {
    id: "uranus",
    name: "Uranus",
    size: 36,
    colors: { base: "#1a4a6a", mid: "#2a6a8a", light: "#4a9ab0", bright: "#6ac0e0" },
    glowColor: "106, 186, 224",
    ring: true,
    ringVertical: true,
    orbit: { radiusX: 440, radiusY: 220, speed: 85, startAngle: 120 },
    float: { amplitude: 7, speed: 0.75 },
    position: { x: "8%", y: "82%" },
    parallaxFactor: 0.5,
    depth: "near",
    mobileHide: true,
  },
  {
    id: "neptune",
    name: "Neptune",
    size: 33,
    colors: { base: "#0a2040", mid: "#1a3a6a", light: "#2a5a9a", bright: "#4080c0" },
    glowColor: "64, 128, 192",
    orbit: { radiusX: 500, radiusY: 250, speed: 100, startAngle: 280 },
    float: { amplitude: 6, speed: 0.85 },
    position: { x: "95%", y: "85%" },
    parallaxFactor: 0.55,
    depth: "near",
    mobileHide: true,
  },
];

// ─── Individual Planet Component ────────────────────────────────────────────
function Planet({ config, reducedMotion, scrollProgress, mouseX, mouseY }) {
  const [hovered, setHovered] = useState(false);
  const { size, colors, glowColor, ring, ringVertical, orbit, float, position, parallaxFactor, depth, hasMoon, moon, surfaceDetail, name } = config;

  const [orbitAngle, setOrbitAngle] = useState(orbit.startAngle);
  const animRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    let angle = orbit.startAngle;
    const animate = () => {
      angle += 360 / (orbit.speed * 60);
      if (angle >= 360) angle -= 360;
      setOrbitAngle(angle);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [reducedMotion, orbit.speed, orbit.startAngle]);

  const rad = (orbitAngle * Math.PI) / 180;
  const orbitX = Math.cos(rad) * orbit.radiusX * 0.7;
  const orbitY = Math.sin(rad) * orbit.radiusY * 0.35;
  const timeProxy = orbitAngle / 360;

  const floatY = reducedMotion ? 0 : Math.sin(timeProxy * Math.PI * 2 * float.speed) * float.amplitude;
  const mx = mouseX * parallaxFactor * 30;
  const my = mouseY * parallaxFactor * 30;
  const scrollDrift = scrollProgress * -100 * parallaxFactor;
  const glowPulse = reducedMotion ? 1 : 0.7 + 0.3 * Math.sin(timeProxy * Math.PI * 2 * float.speed * 0.5);
  const rotationSpeed = orbit.speed * 0.35;

  // Light angle from central sun (always from center of screen)
  const lightAngle = Math.atan2(50 - parseFloat(position.y), 50 - parseFloat(position.x));
  const lightX = 35 + Math.cos(lightAngle) * 15;
  const lightY = 30 + Math.sin(lightAngle) * 15;

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{
        left: position.x, top: position.y,
        transform: `translate(-50%, -50%) translate(${orbitX + mx}px, ${orbitY + floatY + my + scrollDrift}px)`,
        zIndex: depth === "near" ? 5 : depth === "mid" ? 3 : 1,
        perspective: "1200px",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, delay: 0.3, ease: "backOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Planet name tooltip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-[0.2em] uppercase pointer-events-none"
        style={{
          top: -size * 0.9,
          color: `rgba(${glowColor}, 0.9)`,
          textShadow: `0 0 12px rgba(${glowColor}, 0.6), 0 0 24px rgba(${glowColor}, 0.3)`,
        }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? -6 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.div>

      {/* Outer atmospheric glow halo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 3.5, height: size * 3.5,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(${glowColor}, ${0.06 * glowPulse}) 0%, rgba(${glowColor}, ${0.03 * glowPulse}) 40%, transparent 70%)`,
          filter: `blur(${size * 0.4}px)`,
        }}
      />

      {/* Planet container with 3D rotation */}
      <motion.div
        animate={reducedMotion ? {} : { rotateY: 360 }}
        transition={reducedMotion ? {} : { duration: rotationSpeed, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      >
        {/* Planet sphere with dramatic sun-lit gradient */}
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: size, height: size,
            background: `
              radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.15) 0%, transparent 30%),
              radial-gradient(circle at ${lightX}% ${lightY}%, ${colors.bright} 0%, ${colors.light} 12%, ${colors.mid} 30%, ${colors.base} 55%, rgba(0,0,0,0.85) 100%)
            `,
            boxShadow: `
              inset -${size * 0.12}px -${size * 0.08}px ${size * 0.3}px rgba(0,0,0,0.75),
              inset ${size * 0.03}px ${size * 0.03}px ${size * 0.1}px rgba(255,255,255,0.06),
              0 0 ${size * 0.4 * glowPulse}px rgba(${glowColor}, ${0.2 * glowPulse}),
              0 0 ${size * 0.8 * glowPulse}px rgba(${glowColor}, ${0.08 * glowPulse}),
              0 ${size * 0.12}px ${size * 0.4}px rgba(0,0,0,0.5)
            `,
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Primary specular highlight */}
          <div
            className="absolute rounded-full"
            style={{
              width: size * 0.3, height: size * 0.18,
              top: `${lightY - 5}%`, left: `${lightX - 8}%`,
              background: "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 40%, transparent 100%)",
              transform: `rotate(${lightAngle * 20}deg)`,
            }}
          />

          {/* Atmospheric limb glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: size, height: size, top: 0, left: 0,
              background: `linear-gradient(${lightAngle * (180/Math.PI)}deg, transparent 55%, rgba(${glowColor}, 0.1) 80%, rgba(${glowColor}, 0.2) 100%)`,
            }}
          />

          {/* Surface details */}
          {surfaceDetail === "earth" && <EarthSurface size={size} colors={colors} />}
          {surfaceDetail === "mars" && <MarsSurface size={size} colors={colors} />}
          {surfaceDetail === "bands" && <BandedSurface size={size} colors={colors} isJupiter={config.id === "jupiter"} />}
        </div>

        {/* Ring system */}
        {ring && <PlanetRing size={size} vertical={ringVertical} glowColor={glowColor} colors={colors} />}
      </motion.div>

      {/* Moon */}
      {hasMoon && moon && (
        <Moon size={moon.size} distance={moon.distance} speed={moon.speed} color={moon.color} reducedMotion={reducedMotion} />
      )}
    </motion.div>
  );
}

// ─── Earth Surface Details ──────────────────────────────────────────────────
function EarthSurface({ size, colors }) {
  return (
    <>
      {/* Land masses */}
      <div className="absolute rounded-full opacity-35" style={{ width: size * 0.28, height: size * 0.2, top: "20%", left: "12%", background: `linear-gradient(160deg, #1a6030, #2a7040)`, filter: "blur(1.5px)" }} />
      <div className="absolute rounded-full opacity-30" style={{ width: size * 0.2, height: size * 0.25, top: "35%", left: "50%", background: `linear-gradient(130deg, #1a5530, #2a6540)`, filter: "blur(1.5px)" }} />
      <div className="absolute rounded-full opacity-25" style={{ width: size * 0.15, height: size * 0.12, top: "58%", left: "18%", background: "#1a5030", filter: "blur(1px)" }} />
      <div className="absolute rounded-full opacity-20" style={{ width: size * 0.12, height: size * 0.1, top: "15%", left: "55%", background: "#1a5530", filter: "blur(1px)" }} />
      {/* Ice caps */}
      <div className="absolute opacity-25" style={{ width: size * 0.4, height: size * 0.05, top: "4%", left: "30%", background: "white", filter: "blur(2px)", borderRadius: "50%" }} />
      <div className="absolute opacity-20" style={{ width: size * 0.35, height: size * 0.04, bottom: "6%", left: "32%", background: "white", filter: "blur(2px)", borderRadius: "50%" }} />
      {/* Cloud layers */}
      <div className="absolute rounded-full opacity-20" style={{ width: size * 0.5, height: size * 0.06, top: "28%", left: "10%", background: "white", filter: "blur(3px)", transform: "rotate(-5deg)" }} />
      <div className="absolute rounded-full opacity-15" style={{ width: size * 0.4, height: size * 0.05, top: "52%", left: "35%", background: "white", filter: "blur(2.5px)", transform: "rotate(3deg)" }} />
    </>
  );
}

// ─── Mars Surface Details ───────────────────────────────────────────────────
function MarsSurface({ size }) {
  return (
    <>
      <div className="absolute rounded-full opacity-20" style={{ width: size * 0.12, height: size * 0.12, top: "25%", left: "35%", background: "radial-gradient(circle, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.1) 65%, transparent)" }} />
      <div className="absolute rounded-full opacity-15" style={{ width: size * 0.08, height: size * 0.08, top: "50%", left: "20%", background: "radial-gradient(circle, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.08) 60%, transparent)" }} />
      <div className="absolute rounded-full opacity-12" style={{ width: size * 0.16, height: size * 0.16, top: "38%", left: "55%", background: "radial-gradient(circle, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.05) 70%, transparent)" }} />
      <div className="absolute rounded-full opacity-10" style={{ width: size * 0.06, height: size * 0.06, top: "62%", left: "42%", background: "rgba(0,0,0,0.25)" }} />
      {/* Polar ice */}
      <div className="absolute opacity-15" style={{ width: size * 0.3, height: size * 0.04, top: "5%", left: "35%", background: "white", filter: "blur(2px)", borderRadius: "50%" }} />
    </>
  );
}

// ─── Banded Surface (Jupiter/Saturn) ────────────────────────────────────────
function BandedSurface({ size, colors, isJupiter }) {
  return (
    <>
      {[0.18, 0.26, 0.34, 0.42, 0.50, 0.58, 0.66, 0.74, 0.82].map((y, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: "100%",
            height: size * (0.02 + (i % 3) * 0.012),
            top: `${y * 100}%`,
            background: `linear-gradient(90deg, transparent 2%, ${i % 2 === 0 ? colors.light : colors.mid} 15%, ${i % 2 === 0 ? colors.mid : colors.light} 50%, ${i % 2 === 0 ? colors.light : colors.mid} 85%, transparent 98%)`,
            opacity: 0.1 + (i % 4) * 0.03,
          }}
        />
      ))}
      {/* Swirl detail */}
      <div className="absolute rounded-full opacity-8" style={{ width: size * 0.22, height: size * 0.07, top: "38%", left: "22%", background: `linear-gradient(90deg, transparent, ${colors.light}66, transparent)`, filter: "blur(1px)" }} />
      {/* Great Red Spot (Jupiter only) */}
      {isJupiter && (
        <>
          <div className="absolute rounded-full" style={{ width: size * 0.13, height: size * 0.08, top: "52%", left: "30%", background: "radial-gradient(ellipse, rgba(200, 70, 30, 0.35) 25%, rgba(180, 60, 30, 0.15) 65%, transparent)", filter: "blur(1px)" }} />
          <div className="absolute rounded-full" style={{ width: size * 0.07, height: size * 0.04, top: "53%", left: "33%", background: "radial-gradient(ellipse, rgba(220, 80, 40, 0.3) 35%, transparent)" }} />
        </>
      )}
    </>
  );
}

// ─── Planet Ring System ─────────────────────────────────────────────────────
function PlanetRing({ size, vertical, glowColor, colors }) {
  const ringW = size * (vertical ? 0.7 : 2.6);
  const ringH = size * (vertical ? 2.4 : 0.65);
  const rotate = vertical ? "rotateZ(90deg) rotateX(70deg)" : "rotateX(75deg)";

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: ringW, height: ringH,
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) ${rotate}`,
      }}
    >
      {/* Multiple ring bands with gaps */}
      {[
        { pct: 100, width: 1.5, color: `rgba(180, 150, 100, 0.1)`, glow: 4 },
        { pct: 92, width: 2, color: `rgba(200, 170, 110, 0.2)`, glow: 6 },
        { pct: 85, width: 3, color: `rgba(220, 190, 130, 0.3)`, glow: 8 },
        { pct: 78, width: 1.5, color: `rgba(180, 150, 100, 0.12)`, glow: 4 }, // Cassini Division gap
        { pct: 72, width: 2.5, color: `rgba(210, 180, 120, 0.25)`, glow: 7 },
        { pct: 65, width: 1.8, color: `rgba(190, 160, 105, 0.18)`, glow: 5 },
        { pct: 58, width: 1, color: `rgba(170, 140, 90, 0.1)`, glow: 3 },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${ring.pct}%`, height: `${ring.pct}%`,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            border: `${ring.width}px solid ${ring.color}`,
            borderRadius: "50%",
            boxShadow: `0 0 ${ring.glow}px ${ring.color}`,
          }}
        />
      ))}
      {/* Ring shadow */}
      <div className="absolute rounded-full" style={{ width: "88%", height: "88%", top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "50%" }} />
    </div>
  );
}

// ─── Moon Component ─────────────────────────────────────────────────────────
function Moon({ size, distance, speed, color, reducedMotion }) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    let a = 0;
    let raf;
    const animate = () => {
      a += 360 / (speed * 60);
      if (a >= 360) a -= 360;
      setAngle(a);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, speed]);

  const rad = (angle * Math.PI) / 180;
  const mx = Math.cos(rad) * distance;
  const my = Math.sin(rad) * distance * 0.4;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: size, height: size,
        top: "50%", left: "50%",
        transform: `translate(calc(-50% + ${mx}px), calc(-50% + ${my}px))`,
        zIndex: my > 0 ? 2 : 0,
      }}
    >
      <div className="absolute rounded-full" style={{ width: size * 3, height: size * 3, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: `radial-gradient(circle, rgba(200,200,200,0.15) 0%, transparent 70%)` }} />
      <div className="rounded-full" style={{ width: size, height: size, background: `radial-gradient(circle at 35% 30%, ${color} 0%, ${color}dd 40%, ${color}88 100%)`, boxShadow: `inset -${size * 0.2}px -${size * 0.1}px ${size * 0.3}px rgba(0,0,0,0.4)` }} />
    </div>
  );
}

// ─── Main Planets Component ─────────────────────────────────────────────────
export default function Planets() {
  const reducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouse = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
      {PLANETS.map((planet) => (
        <div key={planet.id} className={planet.mobileHide ? "hidden md:block" : ""}>
          <Planet
            config={planet}
            reducedMotion={reducedMotion}
            scrollProgress={scrollProgress}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
          />
        </div>
      ))}
    </div>
  );
}
