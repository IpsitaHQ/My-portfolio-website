import { motion } from "framer-motion";
import { personalInfo } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

/**
 * About Section — Bio + photo + quick facts.
 *
 * TO ADD YOUR PHOTO:
 * 1. Place your headshot in public/photo.jpg
 * 2. Update photoUrl and photoAlt in data.js
 */

export default function About() {
  const [ref, inView] = useScrollAnimation();

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl" />
              {/* Photo container — REPLACE the src with your actual photo */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gray-800 aspect-square flex items-center justify-center">
                {/*
                  REPLACE ME: Uncomment the <img> below and remove the placeholder div
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.photoAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                */}
                <div className="text-center p-8 text-gray-500">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <p className="text-sm">Place your photo in<br/>public/photo.jpg</p>
                </div>
              </div>
              {/* Decorative corner accent */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-indigo-500/30 rounded-2xl" />
            </div>
          </motion.div>

          {/* Bio + quick facts */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-4 mb-8">
              {personalInfo.bio.map((sentence, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-lg">
                  {sentence}
                </p>
              ))}
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.quickFacts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="glass-card p-4"
                >
                  <p className="text-sm text-gray-400 mb-1">{fact.label}</p>
                  <p className="text-lg font-semibold text-white">
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
