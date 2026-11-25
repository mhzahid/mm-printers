"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { mainNav } from "@/data/navigation";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
/** The orange layer leads the ink layer in, and trails it out, by this much. */
const LAG = 90;
/** Shorter on the way out, so the orange reads as a thin edge rather than a band. */
const REVEAL_LAG = 40;

type Variant = "slide" | "iris";
type Phase = { frames: Keyframe[]; ms: number };

/**
 * Two route-change transitions that take turns, one per navigation:
 *
 *   slide  an orange edge, then an ink panel, rise over the page; both lift away upward.
 *   iris   an orange circle, then an ink circle, spread from the centre to cover the page;
 *          a hole then opens from the centre, leaving a thin orange ring on its edge.
 *
 * While covered, the destination's name is shown; the outgoing page sinks back slightly.
 * Only plain clicks on internal links that change the pathname are animated; back/forward,
 * hash links, new-tab clicks and query-only changes stay instant. Disabled with
 * prefers-reduced-motion.
 */
const COVER: Record<Variant, Phase> = {
  slide: { frames: [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }], ms: 560 },
  iris: { frames: [{ clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)" }], ms: 640 },
};
const REVEAL: Record<Variant, Phase> = {
  slide: { frames: [{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }], ms: 760 },
  // --hole is a registered custom property (globals.css) driving a radial mask.
  iris: { frames: [{ "--hole": "0vmax" }, { "--hole": "75vmax" }], ms: 820 },
};
const OUTGOING: Record<Variant, Keyframe[]> = {
  slide: [
    { transform: "translateY(0)", opacity: 1 },
    { transform: "translateY(-5vh)", opacity: 0.5 },
  ],
  iris: [
    { transform: "scale(1)", opacity: 1 },
    { transform: "scale(0.95)", opacity: 0.5 },
  ],
};

function destinationLabel(pathname: string) {
  const match = [...mainNav]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`)));
  return match?.label ?? "MM Printers";
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const pending = useRef<{ to: string; timer: number; variant: Variant } | null>(null);
  const count = useRef(0);
  const revealRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cancelAll = () => {
      [accentRef, inkRef, labelRef].forEach((r) => r.current?.getAnimations().forEach((a) => a.cancel()));
      document.getElementById("main")?.getAnimations().forEach((a) => a.cancel());
    };

    const reveal = () => {
      const root = rootRef.current;
      const accent = accentRef.current;
      const ink = inkRef.current;
      const label = labelRef.current;
      const p = pending.current;
      if (!root || !accent || !ink || !label || !p) return;
      window.clearTimeout(p.timer);
      pending.current = null;
      window.__lenis?.start();
      document.documentElement.dataset.transition = "reveal";
      // The new page is already in place underneath: drop the outgoing-page offset.
      document.getElementById("main")?.getAnimations().forEach((a) => a.cancel());

      const { frames, ms } = REVEAL[p.variant];
      label.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-0.6em)" },
        ],
        { duration: 220, easing: "ease-in", fill: "both" },
      );
      ink.animate(frames, { duration: ms, delay: 120, easing: EASE, fill: "both" });
      const last = accent.animate(frames, { duration: ms, delay: 120 + REVEAL_LAG, easing: EASE, fill: "both" });
      last.onfinish = () => {
        root.style.visibility = "hidden";
        cancelAll();
        delete document.documentElement.dataset.transition;
      };
    };
    revealRef.current = reveal;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download") || "noTransition" in a.dataset) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (pending.current) {
        e.preventDefault();
        return;
      }

      const root = rootRef.current;
      const accent = accentRef.current;
      const ink = inkRef.current;
      const label = labelRef.current;
      if (!root || !accent || !ink || !label) return;
      e.preventDefault();
      e.stopPropagation();

      const variant: Variant = count.current++ % 2 === 0 ? "slide" : "iris";
      const to = url.pathname + url.search + url.hash;
      router.prefetch(to);
      document.documentElement.dataset.transition = "cover";
      window.__lenis?.stop();

      cancelAll();
      root.dataset.variant = variant;
      label.textContent = destinationLabel(url.pathname);
      root.style.visibility = "visible";

      const { frames, ms } = COVER[variant];
      document.getElementById("main")?.animate(OUTGOING[variant], {
        duration: ms + LAG,
        easing: EASE,
        fill: "both",
      });
      accent.animate(frames, { duration: ms, easing: EASE, fill: "both" });
      const cover = ink.animate(frames, { duration: ms, delay: LAG, easing: EASE, fill: "both" });
      label.animate(
        [
          { opacity: 0, transform: "translateY(0.6em)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 380, delay: LAG + ms * 0.6, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
      );

      // Safety net: never leave the page covered if navigation stalls.
      const timer = window.setTimeout(() => reveal(), 4000);
      pending.current = { to, timer, variant };
      cover.onfinish = () => router.push(to);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new route has rendered (and Next.js has scrolled to the top) under the panel.
  useEffect(() => {
    if (!pending.current) return;
    const raf = requestAnimationFrame(() => revealRef.current());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-variant="slide"
      style={{ visibility: "hidden" }}
      className="page-transition pointer-events-none fixed inset-0 z-[90]"
    >
      <div ref={accentRef} className="page-transition-layer absolute inset-0 bg-signal" />
      <div ref={inkRef} className="page-transition-layer absolute inset-0 grid place-items-center bg-ink">
        <p
          ref={labelRef}
          className="px-6 text-center font-display text-[length:var(--step-3)] font-extrabold uppercase leading-none tracking-[-0.01em] text-paper opacity-0 [font-stretch:112%]"
        />
      </div>
    </div>
  );
}
