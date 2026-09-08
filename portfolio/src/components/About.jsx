import { motion } from "framer-motion";
import { personalInfo } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

export default function About() {
  const [ref, inView] = useScrollAnimation();

  return (
    <section
      id="about"
      className="relative py-28 md:py-40 px-6 sm:px-8 lg:px-16"
      ref={ref}
    >
      {/* Orbital dot marker */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
        <div className="orbital-dot" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">01 —</p>
          <h2 className="section-title text-3xl md:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div>
          {/* Bio + Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl w-full"
          >
            <div className="space-y-4 mb-10">
              {personalInfo.bio.map((sentence, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed"
                  style={{ color: "var(--c-text-muted)" }}
                >
                  {sentence}
                </p>
              ))}
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.quickFacts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="glass-card p-5"
                >
                  <p className="section-label text-[0.6rem] mb-2" style={{ color: "var(--c-amber)", opacity: 0.7 }}>
                    {fact.label}
                  </p>
                  <p className="text-lg font-semibold" style={{ color: "var(--c-text)", fontFamily: "var(--font-display)" }}>
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
