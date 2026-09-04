import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

/**
 * Testimonials Section — Short quotes from managers/colleagues.
 * Optional section — remove from App.jsx if not needed.
 */

export default function Testimonials() {
  const [ref, inView] = useScrollAnimation();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
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
            What People <span className="gradient-text">Say</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              <Quote size={24} className="text-indigo-400 mb-4 shrink-0" />
              <p className="text-gray-300 leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
