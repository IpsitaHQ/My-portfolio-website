// =============================================================================
// PORTFOLIO DATA — Ipsita Roy
// Single source of truth. Edit this file to update the entire site.
// =============================================================================

export const personalInfo = {
  name: "Ipsita Roy",
  role: "ML / AI Engineer",
  tagline:
    "Building end-to-end ML applications that turn data into real-world impact.",

  bio: [
    "I'm a B.Tech Computer Science (AI & ML) student at SRM Institute of Science and Technology with a 9.7 CGPA and hands-on experience building machine learning, NLP, and deep learning applications.",
    "I specialize in Python, PyTorch, and scikit-learn — from data pipelines to deployed interfaces — and love turning complex AI problems into accessible, user-friendly tools.",
    "When I'm not training models, you can find me competing in hackathons, contributing to open-source, or exploring the latest research in computer vision.",
  ],

  quickFacts: [
    { label: "CGPA", value: "9.7 / 10" },
    { label: "Location", value: "Chennai, India" },
    { label: "Specialty", value: "ML, NLP & Deep Learning" },
    { label: "Open to", value: "Internships / Entry-Level" },
  ],

  email: "ipshitaroy2007@gmail.com",
  github: "https://github.com/IpsitaHQ",
  linkedin: "https://www.linkedin.com/in/ipsitaroy7002",
  resumeUrl: "/resume.pdf",

  photoUrl: "/photo.jpg",
  photoAlt: "Ipsita Roy headshot",
};

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "C++", icon: "cpp" },
      // REPLACE ME: Add more if needed
    ],
  },
  {
    category: "ML / AI Frameworks",
    items: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "scikit-learn", icon: "sklearn" },
      { name: "OpenCV", icon: "opencv" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "NLP (TF-IDF)", icon: "nlp" },
    ],
  },
  {
    category: "Tools & Libraries",
    items: [
      { name: "Streamlit", icon: "streamlit" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Matplotlib", icon: "matplotlib" },
      { name: "Git / GitHub", icon: "git" },
      { name: "Jupyter Notebook", icon: "jupyter" },
      { name: "VS Code", icon: "vscode" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Smart Expense Categorizer",
    shortDesc:
      "ML web app that auto-classifies financial transactions into 6 categories with 85–95% accuracy.",
    problem:
      "Manual expense tracking is tedious and error-prone. Users need a fast, automatic way to categorize financial transactions without manual tagging.",
    role: " sole developer — designed the ML pipeline, Streamlit UI, and analytics dashboard.",
    techStack: ["Python", "scikit-learn", "Streamlit", "Pandas", "NLP"],
    techDecisions:
      "Chose TF-IDF vectorization + Logistic Regression for its balance of accuracy and speed on short text. Streamlit for rapid prototyping of the interactive dashboard.",
    outcome:
      "Achieved 85–95% classification accuracy across 6 categories (Food, Travel, Shopping, Bills, Entertainment, Healthcare). Supports both single and batch transaction categorization with confidence scoring and CSV export.",
    metrics: [
      { label: "Accuracy", value: "85–95%" },
      { label: "Categories", value: "6" },
    ],
    liveUrl: "#",
    githubUrl:
      "https://github.com/ipsita21012007/Smart-Expense-Categorizer-",
    thumbnail: "/projects/expense-categorizer.jpg",
  },
  {
    id: 2,
    name: "Smart Task Manager — Agentic AI",
    shortDesc:
      "Natural-language task agent that parses free-text commands into structured tasks.",
    problem:
      "Traditional task managers require rigid input formats. Users want to just type naturally — \"schedule meeting at 3pm tomorrow\" — and have the system understand.",
    role: " Sole developer — built the NLP parser, chat interface, and session state management.",
    techStack: ["Python", "Streamlit", "NLP", "Regex"],
    techDecisions:
      "Used regex-based parsing with date/time extraction for reliable, lightweight intent classification without needing a large language model. Streamlit for the responsive chat UI.",
    outcome:
      "Built a working agent that classifies commands as meetings, reminders, or general tasks. Features a live task-list with session-based persistence and a clean chat interface.",
    metrics: [],
    liveUrl: "#",
    githubUrl:
      "https://github.com/ipsita21012007/Smart-Task-manager-Agentic-AI-",
    thumbnail: "/projects/task-manager.jpg",
  },
  {
    id: 3,
    name: "Uncertainty-Aware Terrain Segmentation",
    shortDesc:
      "Multimodal deep learning framework for planetary rover navigation (in progress).",
    problem:
      "Planetary rovers need to assess terrain traversability from limited sensor data while quantifying uncertainty in their predictions for safe navigation.",
    role: " Researcher & developer — designing the multimodal pipeline and training architecture.",
    techStack: ["Python", "PyTorch", "OpenCV", "Hugging Face"],
    techDecisions:
      "Combining RGB, depth, and thermal imagery in a multimodal architecture. Using the BASEPROD dataset from Hugging Face with a modular, reproducible notebook-based workflow for rapid experimentation.",
    outcome:
      "In progress — developing end-to-end preprocessing pipeline and uncertainty estimation module. Targeting semantic segmentation with traversability prediction for rover path planning.",
    metrics: [],
    liveUrl: "#",
    githubUrl:
      "https://github.com/ipsita21012007/UA-MTSeg-Rover-Navigation",
    thumbnail: "/projects/terrain-segmentation.jpg",
  },
];

export const experience = [
  {
    id: 1,
    role: "Community Programs & Digital Initiatives Intern",
    company: "Namjai Foundation",
    companyUrl: "#",
    period: "Jun 2026 — Jul 2026",
    highlights: [
      "Conducted a comprehensive website audit covering content accuracy, design, navigation, SEO, and mobile responsiveness — identified broken links, non-functional buttons, and inconsistent statistics.",
      "Documented findings and improvement proposals in structured reports; used Git/GitHub for version control and content management.",
      "Played a key role in planning CPR and Emergency First Aid Training programmes for the community.",
    ],
  },
];

export const testimonials = [
  // REPLACE ME: Add testimonials from managers/colleagues once available
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
