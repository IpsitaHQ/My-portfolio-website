import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { personalInfo } from "../data";

/**
 * Hero — Cinematic opening with warm sun graphic, orbital lines,
 * and mission-control typography.
 */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-16 pt-24 overflow-hidden"
    >
      {/* ── Warm sun glow from top-right ────────────────────────────── */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,140,66,0.12) 0%, rgba(255,178,94,0.06) 30%, rgba(255,130,50,0.02) 60%, transparent 80%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute inset-[15%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,178,94,0.08) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* ── Orbital rings behind text ───────────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none"
        aria-hidden="true"
      >
        {/* Orbital ring 1 */}
        <div
          className="absolute inset-0 rounded-full border border-white/[0.03]"
          style={{ transform: "rotateX(75deg) rotateZ(12deg)" }}
        />
        {/* Orbital ring 2 */}
        <div
          className="absolute inset-[8%] rounded-full border border-white/[0.025]"
          style={{ transform: "rotateX(75deg) rotateZ(-8deg)" }}
        />
        {/* Orbital ring 3 */}
        <div
          className="absolute inset-[18%] rounded-full border border-white/[0.02]"
          style={{ transform: "rotateX(75deg) rotateZ(20deg)" }}
        />
        {/* Warm accent ring */}
        <div
          className="absolute inset-[5%] rounded-full"
          style={{
            border: "1px solid rgba(255, 140, 66, 0.04)",
            transform: "rotateX(75deg) rotateZ(5deg)",
          }}
        />
        {/* Central glow point */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: "rgba(255, 140, 66, 0.4)",
            boxShadow: "0 0 20px rgba(255, 140, 66, 0.2), 0 0 60px rgba(255, 140, 66, 0.1)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl"
      >
        {/* Status badge */}
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase"
            style={{
              color: "var(--c-amber)",
              background: "rgba(255, 140, 66, 0.08)",
              border: "1px solid rgba(255, 140, 66, 0.15)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--c-amber)",
                boxShadow: "0 0 8px rgba(255, 140, 66, 0.6)",
                animation: "glow-breathe 2s ease-in-out infinite",
              }}
            />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] mb-6"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={item}
          className="section-label text-lg sm:text-xl md:text-2xl mb-8"
          style={{ color: "var(--c-text-muted)", letterSpacing: "0.2em" }}
        >
          {personalInfo.role}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-12 max-w-xl"
          style={{ color: "var(--c-text-muted)" }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn-primary group">
            View Work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="btn-secondary group">
            <Mail size={16} />
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={item} className="mt-20 md:mt-32">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--c-text-muted)", fontFamily: "var(--font-display)" }}
            >
              Scroll
            </span>
            <div
              className="w-5 h-8 rounded-full flex justify-center pt-1.5"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div
                className="w-0.5 h-2 rounded-full"
                style={{ background: "rgba(255, 140, 66, 0.5)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Decorative orbital dot (right side) ──────────────────────── */}
      <div
        className="hidden lg:block absolute right-16 top-1/3"
        aria-hidden="true"
      >
        <div className="orbital-dot" />
        <div
          className="absolute top-0 left-4 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "var(--c-text-muted)",
            transform: "translateY(-50%)",
          }}
        >
          MISSION CONTROL
        </div>
      </div>
    </section>
  );
}
