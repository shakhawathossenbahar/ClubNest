import { useEffect, useRef } from "react";
import Lenis from "lenis";

export let lenisInstance = null;

const LenisProvider = ({ children }) => {
  const rafRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisInstance = lenis;

    // Wheel event ignore for modal
    const handleWheel = (e) => {
      const modal = document.querySelector("dialog[open]");
      if (modal && modal.contains(e.target)) {
        e.stopPropagation(); 
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisInstance = null;
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return children;
};

export default LenisProvider;