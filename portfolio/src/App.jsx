import { ThemeProvider } from "./hooks/useTheme";
import SpaceScene from "./components/SpaceScene";
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
 * - SpaceScene: Cinematic canvas background (starfield, warm sun glow, orbital rings)
 * - Content: All sections flow over the space background
 * - Each section has an orbital dot marker on the left edge (desktop)
 * - Smooth scroll via CSS
 * - All animations use Framer Motion with scroll-triggered reveals
 */
export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {/* Layer 0: Cinematic space background */}
        <SpaceScene />

        {/* Layer 1: Content */}
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
