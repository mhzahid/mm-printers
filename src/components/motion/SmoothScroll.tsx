"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    /** The site's Lenis instance, when smooth scrolling is active (absent with reduced motion). */
    __lenis?: Lenis;
  }
}

/**
 * Inertial smooth scrolling (Lenis) for wheel and trackpad. Touch keeps native scrolling.
 *
 * Skipped entirely with prefers-reduced-motion. Scroll-locked states (open mobile menu, open
 * lightbox dialog) fall back to native behaviour, and every route change resyncs Lenis to the
 * position Next.js set, so pages always open at the top.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      stopInertiaOnNavigate: true,
      anchors: { offset: -88 },
      prevent: (node) =>
        document.body.style.overflow === "hidden" || !!node.closest?.("dialog[open], [role='dialog'], [data-lenis-prevent]"),
    });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Next.js scrolls to the top in a layout effect; drop any leftover inertia so Lenis
  // doesn't carry on toward the previous page's position.
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    lenis.stop();
    lenis.start();
    lenis.resize();
  }, [pathname]);

  return null;
}
