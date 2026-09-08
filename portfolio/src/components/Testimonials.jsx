import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

export default function Testimonials() {
  const [ref, inView] = useScrollAnimation();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative py-28 md:py-40 px-6 sm:px-8 lg:px-16" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">04.5 —</p>
          <h2 className="section-title text-3xl md:text-5xl">
            What People <span className="gradient-text">Say</span>
          </h2>
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
              <Quote size={20} style={{ color: "var(--c-amber)", opacity: 0.5 }} className="mb-4 shrink-0" />
              <p className="text-sm leading-relaxed italic flex-1" style={{ color: "var(--c-text-muted)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--c-text)", fontFamily: "var(--font-display)" }}>{t.author}</p>
                <p className="text-xs" style={{ color: "var(--c-text-muted)" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
