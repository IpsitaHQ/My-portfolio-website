import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

/**
 * Experience Section — Clean timeline of roles.
 *
 * Each entry shows: role, company (linked), period, and 1–2 bullet highlights.
 */

export default function Experience() {
  const [ref, inView] = useScrollAnimation();

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-gray-950 z-10">
                  <Briefcase
                    size={12}
                    className="absolute top-0.5 left-0.5 text-white"
                  />
                </div>

                <div className="glass-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-gray-400 mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>

                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                  >
                    {exp.company}
                  </a>

                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
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
