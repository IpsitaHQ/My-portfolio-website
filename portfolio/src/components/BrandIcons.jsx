/**
 * Brand icon SVG components.
 * Each takes a `size` prop (default 24) and `className`.
 * All icons are true-to-brand colors for instant recognition.
 */

const S = ({ size = 24, className = "", children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

// ─── Python ─────────────────────────────────────────────────────────────────
export function PythonIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <path
        d="M11.998 0C5.366 0 5.8 2.634 5.8 2.634l.006 2.754h6.27v.827H3.782S0 5.682 0 11.978c0 6.296 3.246 6.086 3.246 6.086h1.934v-2.874s-.104-3.246 3.196-3.246h5.472s3.094.05 3.094-2.99V3.044S18.27 0 11.998 0zm-3.17 1.598a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z"
        fill="#3776AB"
      />
      <path
        d="M12.002 24c6.632 0 6.198-2.634 6.198-2.634l-.006-2.754h-6.27v-.827h8.292S24 18.318 24 12.022c0-6.296-3.246-6.086-3.246-6.086h-1.934v2.874s.104 3.246-3.196 3.246H10.152s-3.094-.05-3.094 2.99v5.854S5.73 24 12.002 24zm3.17-1.598a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2z"
        fill="#FFD43B"
      />
    </S>
  );
}

// ─── C++ ────────────────────────────────────────────────────────────────────
export function CppIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#00599C" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        C++
      </text>
    </S>
  );
}

// ─── PyTorch ────────────────────────────────────────────────────────────────
export function PyTorchIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <path
        d="M12.004 0L3.134 5.12v10.24l8.87 5.12 8.87-5.12V5.12L12.004 0zm-.002 2.218l6.778 3.895-3.055 1.762-3.723-2.15V2.218zm-1.23.71v5.51l-3.848 2.222V5.15l3.848-2.222zm-5.546 3.185L2.014 7.6v6.789l3.212 1.855V6.113zm7.776 1.514l3.055 1.762-3.055 1.762-3.055-1.762 3.055-1.762zm-6.546 2.547L2.014 12.1v3.678l3.212 1.855V9.864zm7.776 0l3.055 1.762v3.525l-3.055 1.762V9.864zm-1.23.71v3.525l-3.848 2.222v-3.525l3.848-2.222zm1.23 4.235l3.055 1.762v3.525l-3.055 1.762v-7.049zm-1.23.71v3.525l-3.848 2.222v-3.525l3.848-2.222zm-6.546 2.548L2.014 17.6v3.678l3.212 1.855v-5.533z"
        fill="#EE4C2C"
      />
    </S>
  );
}

// ─── scikit-learn ───────────────────────────────────────────────────────────
export function SklearnIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="11" fill="#F0942D" />
      <text
        x="12"
        y="13"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="7"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        sklearn
      </text>
    </S>
  );
}

// ─── OpenCV ─────────────────────────────────────────────────────────────────
export function OpencvIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#5C3EE8" />
      <circle cx="12" cy="10" r="3.5" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="1" fill="white" />
      <path d="M7 18c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </S>
  );
}

// ─── Hugging Face ───────────────────────────────────────────────────────────
export function HuggingfaceIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="11" fill="#FFD21E" />
      <circle cx="8.5" cy="10.5" r="1.3" fill="#333" />
      <circle cx="15.5" cy="10.5" r="1.3" fill="#333" />
      <path
        d="M8.5 14.5c0 0 1.5 2.5 3.5 2.5s3.5-2.5 3.5-2.5"
        fill="none"
        stroke="#333"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </S>
  );
}

// ─── NLP / TF-IDF ──────────────────────────────────────────────────────────
export function NlpIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#6366F1" />
      <text
        x="12"
        y="10"
        textAnchor="middle"
        fill="white"
        fontSize="5.5"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        NLP
      </text>
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fill="rgba(255,255,255,0.7)"
        fontSize="4.5"
        fontFamily="Arial, sans-serif"
      >
        TF-IDF
      </text>
    </S>
  );
}

// ─── Streamlit ──────────────────────────────────────────────────────────────
export function StreamlitIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <path
        d="M12.001 2.5l-7.5 4.33v8.66l7.5 4.33 7.5-4.33V6.83L12.001 2.5z"
        fill="#FF4B4B"
      />
      <path
        d="M12.001 10.16l-4.33 2.5v5l4.33 2.5 4.33-2.5v-5l-4.33-2.5z"
        fill="white"
        opacity="0.3"
      />
    </S>
  );
}

// ─── Pandas ─────────────────────────────────────────────────────────────────
export function PandasIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#150458" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="#150458"
        fontSize="0"
        fontFamily="Arial, sans-serif"
      />
      {/* Panda face */}
      <circle cx="12" cy="12" r="8" fill="white" />
      <circle cx="12" cy="12" r="7" fill="#150458" />
      <circle cx="9" cy="10.5" r="2.2" fill="white" />
      <circle cx="15" cy="10.5" r="2.2" fill="white" />
      <circle cx="9" cy="10.5" r="1" fill="#150458" />
      <circle cx="15" cy="10.5" r="1" fill="#150458" />
      <ellipse cx="12" cy="14" rx="1.5" ry="1" fill="#555" />
    </S>
  );
}

// ─── NumPy ──────────────────────────────────────────────────────────────────
export function NumpyIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#4DABCF" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        Np
      </text>
    </S>
  );
}

// ─── Matplotlib ─────────────────────────────────────────────────────────────
export function MatplotlibIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#11557C" />
      {/* Mini chart */}
      <polyline
        points="4,18 8,10 12,14 16,6 20,12"
        fill="none"
        stroke="#33B5E5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10" r="1.2" fill="#33B5E5" />
      <circle cx="12" cy="14" r="1.2" fill="#33B5E5" />
      <circle cx="16" cy="6" r="1.2" fill="#33B5E5" />
    </S>
  );
}

// ─── Git ────────────────────────────────────────────────────────────────────
export function GitIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <path
        d="M23.5 11.3L12.7.5a1.65 1.65 0 00-2.33 0L8.05 2.85l2.94 2.94a1.95 1.95 0 012.49 2.51l2.75 2.75a1.95 1.95 0 11-1.17.56V8.15a1.95 1.95 0 01-1.06-2.55L10.6 3.48.5 13.58a1.65 1.65 0 000 2.33l10.8 10.8a1.65 1.65 0 002.33 0l9.87-9.87a1.65 1.65 0 000-2.34"
        fill="#F05032"
      />
    </S>
  );
}

// ─── Jupyter ────────────────────────────────────────────────────────────────
export function JupyterIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#F37626" />
      {/* Jupyter J shape */}
      <path
        d="M13 5v8.5c0 1.93-1.57 3.5-3.5 3.5S6 15.43 6 13.5"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Dot */}
      <circle cx="14.5" cy="6" r="1.8" fill="white" />
    </S>
  );
}

// ─── VS Code ────────────────────────────────────────────────────────────────
export function VscodeIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#007ACC" />
      <path
        d="M17.5 2.5 22 5v14l-4.5 2.5L12 16l-5.5 5.5L2 19V5l4.5-2.5L12 8l5.5-5.5zM6.5 6.5 4 8v8l2.5 1.5 5.5-5.5-5.5-5.5z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M17.5 6.5 12 12l5.5 5.5V6.5z"
        fill="white"
        opacity="0.5"
      />
    </S>
  );
}

// ─── GitHub (for navbar/footer) ─────────────────────────────────────────────
export function GithubIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <path
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
        fill="currentColor"
      />
    </S>
  );
}

// ─── LinkedIn (for navbar/footer) ───────────────────────────────────────────
export function LinkedinIcon({ size = 24, className = "", ...props }) {
  return (
    <S size={size} className={className} {...props}>
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    </S>
  );
}
