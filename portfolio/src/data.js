// =============================================================================
// PORTFOLIO DATA — REPLACE ALL [REPLACE ME] VALUES WITH YOUR OWN INFO
// This is the single source of truth. Edit this file to update the entire site.
// =============================================================================

export const personalInfo = {
  // ===== BASIC INFO =====
  name: "[YOUR NAME]",                    // e.g. "Alex Chen"
  role: "[YOUR ROLE]",                    // e.g. "Full-Stack Engineer"
  tagline: "[ONE-LINE VALUE PROPOSITION]", // e.g. "Building performant web apps that scale to millions."
  // Keep hero copy under 25 words — recruiters skim

  // ===== BIO (for About section, 3-4 sentences) =====
  bio: [
    "I'm a [YOUR ROLE] with [X] years of experience building [WHAT YOU BUILD].",
    "I specialize in [YOUR SPECIALTY] and love turning complex problems into elegant, user-friendly solutions.",
    "When I'm not coding, you can find me [PERSONAL INTEREST].",
  ],

  // ===== QUICK FACTS (displayed in About section) =====
  quickFacts: [
    { label: "Experience", value: "[X]+ Years" },       // e.g. "5+ Years"
    { label: "Location", value: "[YOUR CITY]" },        // e.g. "San Francisco, CA"
    { label: "Specialty", value: "[YOUR SPECIALTY]" },  // e.g. "React & Node.js"
    { label: "Open to", value: "Remote / On-site" },
  ],

  // ===== CONTACT INFO =====
  email: "[YOUR EMAIL]",               // e.g. "alex@example.com"
  github: "https://github.com/[YOUR_GITHUB]",
  linkedin: "https://linkedin.com/in/[YOUR_LINKEDIN]",
  resumeUrl: "/resume.pdf",            // Place your resume PDF in public/resume.pdf

  // ===== PHOTO (for About section) =====
  // Place your photo in public/photo.jpg and update the path below
  photoUrl: "/photo.jpg",
  photoAlt: "[YOUR NAME] headshot",
};

export const skills = [
  // ===== LANGUAGES =====
  {
    category: "Languages",
    items: [
      { name: "JavaScript", icon: "js" },
      { name: "TypeScript", icon: "ts" },
      { name: "Python", icon: "python" },
      { name: "HTML/CSS", icon: "html" },
      // REPLACE ME: Add/remove your languages
    ],
  },
  // ===== FRAMEWORKS =====
  {
    category: "Frameworks",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      // REPLACE ME: Add/remove your frameworks
    ],
  },
  // ===== TOOLS =====
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws" },
      { name: "Figma", icon: "figma" },
      // REPLACE ME: Add/remove your tools
    ],
  },
];

export const projects = [
  // ===== PROJECT 1 =====
  {
    id: 1,
    name: "[PROJECT NAME 1]",
    shortDesc: "[ONE-LINE PROBLEM/SOLUTION]",
    // e.g. "An e-commerce platform that reduced checkout time by 40%"
    problem: "[Describe the problem this project solved]",
    role: "[Your specific role — e.g. 'Lead frontend developer']",
    techStack: ["React", "Node.js", "PostgreSQL"],
    // REPLACE ME: Update with your actual tech stack
    techDecisions: "[Why you chose these technologies]",
    outcome: "[Impact/results — use metrics if possible]",
    metrics: [
      // Optional: quantitative impact
      // { label: "Users", value: "10K+" },
      // { label: "Performance", value: "3x faster" },
    ],
    liveUrl: "[LIVE URL or #]",
    githubUrl: "[GITHUB URL or #]",
    thumbnail: "/projects/project1.jpg", // Place in public/projects/
  },
  // ===== PROJECT 2 =====
  {
    id: 2,
    name: "[PROJECT NAME 2]",
    shortDesc: "[ONE-LINE PROBLEM/SOLUTION]",
    problem: "[Describe the problem]",
    role: "[Your role]",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    techDecisions: "[Why these tech choices]",
    outcome: "[Impact/results]",
    metrics: [],
    liveUrl: "[LIVE URL or #]",
    githubUrl: "[GITHUB URL or #]",
    thumbnail: "/projects/project2.jpg",
  },
  // ===== PROJECT 3 =====
  {
    id: 3,
    name: "[PROJECT NAME 3]",
    shortDesc: "[ONE-LINE PROBLEM/SOLUTION]",
    problem: "[Describe the problem]",
    role: "[Your role]",
    techStack: ["Python", "FastAPI", "React"],
    techDecisions: "[Why these tech choices]",
    outcome: "[Impact/results]",
    metrics: [],
    liveUrl: "[LIVE URL or #]",
    githubUrl: "[GITHUB URL or #]",
    thumbnail: "/projects/project3.jpg",
  },
  // REPLACE ME: Add more projects (up to 6)
];

export const experience = [
  // ===== ROLE 1 =====
  {
    id: 1,
    role: "[JOB TITLE]",
    company: "[COMPANY NAME]",
    companyUrl: "[COMPANY URL]",
    period: "[START DATE] — [END DATE]",  // e.g. "Jan 2023 — Present"
    highlights: [
      "[Key achievement #1 with metrics if possible]",
      "[Key achievement #2]",
    ],
  },
  // ===== ROLE 2 =====
  {
    id: 2,
    role: "[JOB TITLE]",
    company: "[COMPANY NAME]",
    companyUrl: "[COMPANY URL]",
    period: "[START DATE] — [END DATE]",
    highlights: [
      "[Key achievement #1]",
      "[Key achievement #2]",
    ],
  },
  // ===== ROLE 3 =====
  {
    id: 3,
    role: "[JOB TITLE]",
    company: "[COMPANY NAME]",
    companyUrl: "[COMPANY URL]",
    period: "[START DATE] — [END DATE]",
    highlights: [
      "[Key achievement #1]",
    ],
  },
  // REPLACE ME: Add/remove roles
];

export const testimonials = [
  {
    id: 1,
    quote: "[A short, impactful quote from a manager or colleague]",
    author: "[AUTHOR NAME]",
    role: "[AUTHOR ROLE at COMPANY]",
    // e.g. "Engineering Manager at Acme Corp"
  },
  {
    id: 2,
    quote: "[Another quote highlighting a different strength]",
    author: "[AUTHOR NAME]",
    role: "[AUTHOR ROLE at COMPANY]",
  },
  // REPLACE ME: Add/remove testimonials
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
