import { motion } from "framer-motion";
import { skills } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

/**
 * Skills Section — Clean categorized grid.
 *
 * Shows skills grouped by category with emoji icon badges.
 *
 * TO USE REAL ICONS:
 * 1. Install react-icons: npm install react-icons
 * 2. Import the specific icon component (e.g. { FaPython } from "react-icons/fa")
 * 3. Map skill.icon names to actual icon components in the render
 */

const iconMap = {
  python: "🐍",
  cpp: "⚡",
  pytorch: "🔥",
  sklearn: "📊",
  opencv: "👁️",
  huggingface: "🤗",
  nlp: "💬",
  streamlit: "🎈",
  pandas: "🐼",
  numpy: "🔢",
  matplotlib: "📈",
  git: "🔀",
  jupyter: "📓",
  vscode: "💻",
  // REPLACE ME: Add more icons for your skills
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Skills() {
  const [ref, inView] = useScrollAnimation();

  return (
    <section
      id="skills"
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
            <span className="gradient-text">Skills</span> & Tools
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.15 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
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
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 transition-colors cursor-default"
                  >
                    <span className="text-lg" aria-hidden="true">
                      {iconMap[skill.icon] || "•"}
                    </span>
                    <span className="text-sm font-medium text-gray-200">
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
