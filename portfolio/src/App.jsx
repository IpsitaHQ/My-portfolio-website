import { ThemeProvider } from "./hooks/useTheme";
import CanvasBackground from "./components/CanvasBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * App — Root component.
 *
 * Architecture:
 * - ThemeProvider wraps everything for dark/light mode
 * - CanvasBackground is a fixed-position canvas behind all content
 * - Each section is a standalone component (easy to reorder/remove)
 * - Smooth scroll is enabled via CSS (scroll-behavior: smooth)
 * - All animations use Framer Motion with scroll-triggered reveals
 */
export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {/* 3D-like particle background — fixed behind all content */}
        <CanvasBackground />

        {/* Content layer */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
