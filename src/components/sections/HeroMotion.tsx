"use client";

import { useEffect } from "react";

/**
 * The site's single orchestrated moment: headline lines rise out of their masks,
 * the trims board wipes open and the accessories settle onto it, the hang tag
 * swinging into place. A gentle scroll-linked drift follows. Skipped entirely
 * for reduced motion.
 */
export function HeroMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(".hero-line", { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, duration: 1.1, stagger: 0.09 })
          .fromTo(
            "#hero-board",
            { clipPath: "inset(100% 0% 0% 0% round 6px)" },
            { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.1, ease: "power3.inOut" },
            0.15,
          )
          .fromTo(
            ".hero-piece",
            { y: -40, autoAlpha: 0, rotate: (i: number) => (i === 0 ? -16 : 6) },
            { y: 0, autoAlpha: 1, rotate: 0, duration: 1, stagger: 0.08, ease: "back.out(1.4)" },
            0.6,
          )
          .fromTo(".hero-cap", { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 }, 1.2)
          .fromTo(".hero-fade", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.55);

        // The hang tag settles with a small swing, pivoting on its string.
        const tag = document.querySelector<HTMLElement>(".hero-piece");
        if (tag) {
          gsap.set(tag, { transformOrigin: "60% 5%" });
          tl.to(tag, { keyframes: { rotate: [0, 4, -2.5, 1, 0] }, duration: 2, ease: "sine.inOut" }, 1.5);
        }

        // Scroll-linked drift — pieces separate slightly as the hero leaves.
        gsap.utils.toArray<HTMLElement>(".hero-piece").forEach((el, i) => {
          gsap.to(el, {
            yPercent: (i % 2 ? -1 : 1) * (6 + i * 2),
            ease: "none",
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.5 },
          });
        });
      }, "#hero");
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
