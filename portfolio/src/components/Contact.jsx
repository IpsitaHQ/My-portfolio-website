import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { personalInfo } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

export default function Contact() {
  const [ref, inView] = useScrollAnimation();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: `mailto:${personalInfo.email}` },
    { icon: GithubIcon, label: "GitHub", href: personalInfo.github, external: true },
    { icon: LinkedinIcon, label: "LinkedIn", href: personalInfo.linkedin, external: true },
  ];

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 sm:px-8 lg:px-16" ref={ref}>
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
          <p className="section-label mb-3">05 —</p>
          <h2 className="section-title text-3xl md:text-5xl">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm" style={{ color: "var(--c-text-muted)" }}>
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="section-label text-[0.65rem] block mb-2" style={{ color: "var(--c-text-muted)" }}>
                  Name
                </label>
                <input id="name" type="text" required value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="input-field" placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="section-label text-[0.65rem] block mb-2" style={{ color: "var(--c-text-muted)" }}>
                  Email
                </label>
                <input id="email" type="email" required value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="input-field" placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="section-label text-[0.65rem] block mb-2" style={{ color: "var(--c-text-muted)" }}>
                  Message
                </label>
                <textarea id="message" required rows={5} value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="input-field resize-none" placeholder="Tell me about your project..."
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={16} /> Send Message
              </button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-center"
                  style={{ color: "var(--c-amber)" }}
                >
                  ✓ Message sent! (Demo — wire up your form service)
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <p className="mb-6 text-sm" style={{ color: "var(--c-text-muted)" }}>
              Or reach me directly through any of these channels:
            </p>
            <div className="space-y-3">
              {socialLinks.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="glass-card glass-card-warm flex items-center gap-4 p-4 group transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: "rgba(255, 140, 66, 0.06)" }}
                  >
                    <Icon size={18} style={{ color: "var(--c-amber)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--c-text)", fontFamily: "var(--font-display)" }}>{label}</p>
                    <p className="text-xs" style={{ color: "var(--c-text-muted)" }}>
                      {label === "Email" ? personalInfo.email : href.replace("https://", "")}
                    </p>
                  </div>
                  <ExternalLink size={13} className="ml-auto transition-colors" style={{ color: "var(--c-text-muted)" }} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
