import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { personalInfo } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 px-6 sm:px-8 lg:px-16"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ color: "var(--c-text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}>
          © {year} {personalInfo.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="transition-colors" style={{ color: "var(--c-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--c-amber)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--c-text-muted)"}
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="transition-colors" style={{ color: "var(--c-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--c-amber)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--c-text-muted)"}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a href={`mailto:${personalInfo.email}`}
            className="transition-colors" style={{ color: "var(--c-text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--c-amber)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--c-text-muted)"}
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
