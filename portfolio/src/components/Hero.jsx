import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { personalInfo } from "../data";

/**
 * Hero Section — The first thing recruiters see.
 *
 * Design decisions:
 * - Under 25 words of copy (recruiters skim fast)
 * - Two strong CTAs: View Work (primary) + Contact (secondary)
 * - Resume download always visible via Navbar
 * - The canvas particle background sits BEHIND this section
 * - Floating CSS 3D shape adds depth without heavy JS
 *
 * TO ADD A REAL 3D SCENE:
 * 1. Import { Canvas } from "@react-three/fiber" and { Float } from "@react-three/drei"
 * 2. Wrap a <Canvas> in this section with a low-poly mesh or shader
 * 3. Use React.lazy() to code-split it for performance
 */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden"
    >
      {/* Decorative floating 3D-like accent shape (CSS 3D, no JS library needed) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.07] pointer-events-none"
        aria-hidden="true"
        style={{ perspective: "800px" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1)",
            filter: "blur(60px)",
            animation: "spin 20s linear infinite",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Greeting badge */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={item}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-400 dark:text-gray-400 mb-6"
        >
          {personalInfo.role}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            View Work
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/5"
          >
            <Mail size={18} />
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-16 md:mt-24"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 mx-auto rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Keyframes for the spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
