import { motion } from "framer-motion";
import { skills } from "../data";
import { useScrollAnimation } from "./SectionWrapper";
import {
  PythonIcon, CppIcon, PyTorchIcon, SklearnIcon, OpencvIcon,
  HuggingfaceIcon, NlpIcon, StreamlitIcon, PandasIcon, NumpyIcon,
  MatplotlibIcon, GitIcon, JupyterIcon, VscodeIcon,
} from "./BrandIcons";

const iconMap = {
  python: PythonIcon, cpp: CppIcon, pytorch: PyTorchIcon, sklearn: SklearnIcon,
  opencv: OpencvIcon, huggingface: HuggingfaceIcon, nlp: NlpIcon,
  streamlit: StreamlitIcon, pandas: PandasIcon, numpy: NumpyIcon,
  matplotlib: MatplotlibIcon, git: GitIcon, jupyter: JupyterIcon, vscode: VscodeIcon,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Skills() {
  const [ref, inView] = useScrollAnimation();

  return (
    <section id="skills" className="relative py-28 md:py-40 px-6 sm:px-8 lg:px-16" ref={ref}>
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
          <p className="section-label mb-3">02 —</p>
          <h2 className="section-title text-3xl md:text-5xl">
            <span className="gradient-text">Skills</span> & Tools
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.12 }}
              className="glass-card p-6"
            >
              <h3
                className="text-sm font-semibold mb-5 flex items-center gap-3"
                style={{ fontFamily: "var(--font-display)", color: "var(--c-text)", letterSpacing: "0.04em" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--c-amber)", boxShadow: "0 0 8px rgba(255,140,66,0.4)" }} />
                {group.category}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-default transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(95,168,211,0.06)";
                      e.currentTarget.style.borderColor = "rgba(95,168,211,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                    }}
                  >
                    <span className="flex-shrink-0" aria-hidden="true">
                      {(() => {
                        const IconComp = iconMap[skill.icon];
                        return IconComp ? <IconComp size={16} /> : <span className="w-4 h-4 rounded-full inline-block" style={{ background: "rgba(255,255,255,0.1)" }} />;
                      })()}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "var(--c-text)", fontFamily: "var(--font-body)" }}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
