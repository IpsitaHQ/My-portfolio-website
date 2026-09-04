import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { personalInfo } from "../data";
import { useScrollAnimation } from "./SectionWrapper";

/**
 * Contact Section — Form + direct links.
 *
 * The form currently just shows a success toast (static demo).
 * To make it functional:
 * 1. Use a service like Formspree, Netlify Forms, or EmailJS
 * 2. Replace the onSubmit handler with a fetch() to your endpoint
 */

export default function Contact() {
  const [ref, inView] = useScrollAnimation();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // REPLACE ME: Add your form submission logic (Formspree, Netlify Forms, etc.)
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
    <section
      id="contact"
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-500/25"
              >
                <Send size={18} />
                Send Message
              </button>

              {/* Success toast */}
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center"
                >
                  ✓ Message sent! (Demo — wire up your form service)
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Direct links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <p className="text-gray-400 mb-6">
              Or reach me directly through any of these channels:
            </p>
            <div className="space-y-3">
              {socialLinks.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 glass-card hover:border-indigo-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Icon size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-gray-400">
                      {label === "Email"
                        ? personalInfo.email
                        : href.replace("https://", "")}
                    </p>
                  </div>
                  <ExternalLink
                    size={14}
                    className="ml-auto text-gray-500 group-hover:text-indigo-400 transition-colors"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
