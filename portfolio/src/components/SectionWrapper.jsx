import { useRef, useState, useEffect } from "react";

/**
 * Custom hook for scroll-triggered animations.
 * Returns a ref to attach to the section and a boolean for visibility.
 * Uses IntersectionObserver for performance — no scroll event listeners.
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // Only animate once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
