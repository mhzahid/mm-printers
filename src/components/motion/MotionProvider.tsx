"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll motion.
 *
 * Markup opts in with data attributes — no component needs its own ScrollTrigger:
 *   data-reveal="up"      fade + rise when entering the viewport
 *   data-reveal="mask"    clip-path wipe (images, illustration panels)
 *   data-reveal="stagger" children with [data-reveal-item] enter in sequence
 *   data-reveal="line"    horizontal rule draws from the left
 *   data-reveal="words"   page titles: each [data-word] rises out of its own mask on load
 *   data-parallax="0.15"  drifts against the scroll (fraction of its height)
 *
 * Headings (h1/h2) with data-reveal="up" rise out of a clip mask instead of a plain fade.
 * Scroll positions come from Lenis when it is running (see SmoothScroll).
 *
 * GSAP is loaded lazily so it never blocks first paint. Everything is torn down
 * on route change via gsap.context().revert(), so triggers never leak or duplicate.
 * With prefers-reduced-motion, nothing is hidden or animated.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.remove("js-motion");
      root.dataset.motionReady = "true";
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let offLenis: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      root.dataset.motionReady = "true";
      offLenis = window.__lenis?.on("scroll", ScrollTrigger.update);

      // Arriving through the page transition: let the cover start lifting before the page animates in.
      if (root.dataset.transition === "cover") await new Promise((r) => setTimeout(r, 380));
      if (cancelled) return;

      ctx = gsap.context(() => {
        const ease = "power3.out";

        gsap.utils.toArray<HTMLElement>('[data-reveal="words"]').forEach((el) => {
          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(
            el.querySelectorAll("[data-word]"),
            // y: 0 overrides the pixel offset GSAP reads from the CSS starting transform
            { y: 0, yPercent: 115 },
            { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.07, delay: 0.1 },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="up"]').forEach((el) => {
          const trigger = { trigger: el, start: "top 88%", once: true };
          if (el.matches("h1, h2")) {
            gsap.fromTo(
              el,
              { autoAlpha: 1, y: 48, clipPath: "inset(100% 0% -20% 0%)" },
              {
                y: 0,
                clipPath: "inset(0% 0% -20% 0%)",
                duration: 1.1,
                ease: "power4.out",
                clearProps: "clipPath",
                scrollTrigger: trigger,
              },
            );
            return;
          }
          gsap.fromTo(el, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.9, ease, scrollTrigger: trigger });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 0.12;
          gsap.fromTo(
            el,
            { yPercent: amount * 100 },
            {
              yPercent: -amount * 100,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="mask"]').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 1, clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              clearProps: "clipPath",
              duration: 1.1,
              ease: "power4.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="line"]').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 1, scaleX: 0, transformOrigin: "0 50%" },
            { scaleX: 1, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((group) => {
          gsap.set(group, { autoAlpha: 1 });
          const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease,
              stagger: { each: 0.06, from: "start" },
              scrollTrigger: { trigger: group, start: "top 85%", once: true },
            },
          );
        });

        // Timeline progress line (manufacturing / workflow): scrubbed to scroll.
        gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((tl) => {
          const bar = tl.querySelector<HTMLElement>("[data-timeline-bar]");
          if (!bar) return;
          gsap.fromTo(
            bar,
            { scaleY: 0, transformOrigin: "50% 0%" },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 70%", end: "bottom 70%", scrub: 0.6 } },
          );
        });
      });

      // Catch late-loading fonts/images so trigger positions are right.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      offLenis?.();
    };
  }, [pathname]);

  return null;
}

/** Inline, pre-hydration: hide reveal targets only when JS motion will run, with a safety net. */
export const motionBootScript = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');setTimeout(function(){if(!d.dataset.motionReady){d.classList.remove('js-motion')}},3000)}}catch(e){}})();`;
