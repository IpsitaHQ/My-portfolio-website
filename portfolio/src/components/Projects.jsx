import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

/**
 * Projects Section — Case-study style cards with a detail modal.
 *
 * Each card answers: what problem it solved, what was built, what the result was.
 * Clicking "View Details" opens a modal with the full case study.
 *
 * TO ADD REAL THUMBNAILS:
 * 1. Place screenshots in public/projects/ (e.g. project1.jpg)
 * 2. Update thumbnail paths in data.js
 */

export default function Projects() {
  const [ref, inView] = useScrollAnimation();
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="projects"
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => setSelected(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setSelected(project)
              }
              aria-label={`View details for ${project.name}`}
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 group-hover:from-indigo-600/30 group-hover:to-purple-600/30 transition-colors flex items-center justify-center">
                  <span className="text-4xl opacity-40">📦</span>
                  {/*
                    REPLACE ME: Uncomment below for real thumbnails
                    <img src={project.thumbnail} alt={project.name}
                         className="w-full h-full object-cover" loading="lazy" />
                  */}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.shortDesc}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 text-sm">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    <GithubIcon size={14} />
                    Code
                  </a>
                  <span className="ml-auto text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={`Project details: ${selected.name}`}
            >
              {/* Modal header */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {selected.name}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Case study details */}
              <div className="space-y-5">
                <DetailBlock title="Problem" text={selected.problem} />
                <DetailBlock title="My Role" text={selected.role} />
                <DetailBlock title="Tech Decisions" text={selected.techDecisions} />
                <DetailBlock title="Outcome & Impact" text={selected.outcome} />

                {/* Metrics */}
                {selected.metrics && selected.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {selected.metrics.map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-white/5">
                        <p className="text-2xl font-bold gradient-text">
                          {m.value}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal actions */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-colors"
                >
                  <GithubIcon size={16} />
                  View Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wide mb-1">
        {title}
      </h4>
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}
