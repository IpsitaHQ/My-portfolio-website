import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { personalInfo, navLinks } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b"
          : "bg-transparent"
      }`}
      style={scrolled ? {
        background: "rgba(5, 6, 10, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.04)",
      } : {}}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-bold gradient-text"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            aria-label={`${personalInfo.name} - Home`}
          >
            {personalInfo.name}
          </a>

          {/* Desktop nav — mission-control HUD labels */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-label px-4 py-2 rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase rounded-lg transition-all"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--c-text-muted)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--c-text)";
                e.currentTarget.style.borderColor = "rgba(255, 140, 66, 0.3)";
                e.currentTarget.style.background = "rgba(255, 140, 66, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--c-text-muted)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--c-text-muted)" }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl border-b overflow-hidden"
            style={{
              background: "rgba(5, 6, 10, 0.9)",
              borderColor: "rgba(255,255,255,0.04)",
            }}
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="nav-label block px-3 py-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-3 mt-2 text-xs font-semibold tracking-[0.1em] uppercase rounded-lg transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--c-amber)",
                  background: "rgba(255, 140, 66, 0.08)",
                }}
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
