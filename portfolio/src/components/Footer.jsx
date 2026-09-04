import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { personalInfo } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {year} {personalInfo.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
