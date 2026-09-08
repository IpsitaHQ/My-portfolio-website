import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

export default function Experience() {
  const [ref, inView] = useScrollAnimation();

  return (
    <section id="experience" className="relative py-28 md:py-40 px-6 sm:px-8 lg:px-16" ref={ref}>
      {/* Orbital dot */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
        <div className="orbital-dot" style={{ background: "var(--c-blue)", boxShadow: "0 0 12px rgba(95,168,211,0.5), 0 0 30px rgba(95,168,211,0.2)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">04 —</p>
          <h2 className="section-title text-3xl md:text-5xl">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, rgba(255,140,66,0.3) 0%, rgba(95,168,211,0.15) 50%, transparent 100%)",
            }}
          />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full z-10 flex items-center justify-center"
                  style={{
                    background: "var(--c-amber)",
                    boxShadow: "0 0 10px rgba(255,140,66,0.4)",
                  }}
                >
                  <Briefcase size={10} style={{ color: "var(--c-black)" }} />
                </div>

                <div className="glass-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3
                      className="text-lg font-semibold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--c-text)" }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      className="section-label text-[0.6rem] mt-1 sm:mt-0"
                      style={{ color: "var(--c-text-muted)" }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--c-amber)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--c-amber-light)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--c-amber)"}
                  >
                    {exp.company}
                  </a>

                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--c-text-muted)" }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--c-amber)", opacity: 0.6 }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
