import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

export default function Projects() {
  const [ref, inView] = useScrollAnimation();
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="relative py-28 md:py-40 px-6 sm:px-8 lg:px-16" ref={ref}>
      {/* Orbital dot */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
        <div className="orbital-dot" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">03 —</p>
          <h2 className="section-title text-3xl md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card glass-card-warm overflow-hidden group cursor-pointer"
              onClick={() => setSelected(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(project)}
              aria-label={`View details for ${project.name}`}
            >
              {/* Thumbnail */}
              <div className="aspect-video relative overflow-hidden"
                style={{ background: "rgba(13, 17, 23, 0.8)" }}
              >
                <img src={project.thumbnail} alt={project.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                {/* Warm glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,140,66,0.08) 0%, transparent 60%)" }}
                />
              </div>

              <div className="p-5">
                <h3
                  className="text-base font-semibold mb-2 group-hover:text-[var(--c-amber)] transition-colors"
                  style={{ fontFamily: "var(--font-display)", color: "var(--c-text)", letterSpacing: "0.02em" }}
                >
                  {project.name}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--c-text-muted)" }}>
                  {project.shortDesc}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 text-sm">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 transition-colors"
                    style={{ color: "var(--c-text-muted)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--c-blue)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--c-text-muted)"}
                  >
                    <ExternalLink size={13} /> Live
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 transition-colors"
                    style={{ color: "var(--c-text-muted)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--c-blue)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--c-text-muted)"}
                  >
                    <GithubIcon size={13} /> Code
                  </a>
                  <span className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--c-amber)", fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                  >
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: "rgba(5, 6, 10, 0.75)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
              style={{ border: "1px solid rgba(255, 140, 66, 0.1)" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={`Project details: ${selected.name}`}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--c-text)" }}>
                  {selected.name}
                </h3>
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg transition-colors"
                  style={{ color: "var(--c-text-muted)" }} aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="space-y-5">
                {[
                  { title: "Problem", text: selected.problem },
                  { title: "My Role", text: selected.role },
                  { title: "Tech Decisions", text: selected.techDecisions },
                  { title: "Outcome & Impact", text: selected.outcome },
                ].filter(b => b.text).map((block) => (
                  <div key={block.title}>
                    <h4 className="section-label text-[0.65rem] mb-1.5" style={{ color: "var(--c-amber)" }}>
                      {block.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--c-text-muted)" }}>{block.text}</p>
                  </div>
                ))}

                {selected.metrics?.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {selected.metrics.map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <p className="text-xl font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>{m.value}</p>
                        <p className="text-xs mt-1" style={{ color: "var(--c-text-muted)" }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                  <GithubIcon size={14} /> View Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
