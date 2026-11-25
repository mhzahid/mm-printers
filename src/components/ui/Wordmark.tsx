import { cn } from "@/lib/cn";

/**
 * Proposed wordmark: "MM" set inside a woven-label shape, followed by "Printers".
 * MM Printers has no formal logo on record — replace this component with the
 * approved logo (SVG) once supplied.
 */
export function Wordmark({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const fg = tone === "ink" ? "var(--color-ink)" : "var(--color-paper)";
  const bg = tone === "ink" ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)} style={{ color: fg }}>
      <svg viewBox="0 0 64 36" className="h-[1.9em] w-auto" aria-hidden="true">
        <path d="M6 0 H58 L64 4 V32 L58 36 H6 L0 32 V4 Z" fill={fg} />
        <path d="M6 3 V33 M58 3 V33" stroke={bg} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        <text
          x="32"
          y="25.5"
          textAnchor="middle"
          fill={bg}
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, fontStretch: "120%" }}
        >
          MM
        </text>
        <rect x="27" y="29" width="10" height="2" rx="1" fill="var(--color-signal)" />
      </svg>
      <span className="font-display text-[1.15em] font-[750] tracking-[-0.01em] [font-stretch:108%]">Printers</span>
    </span>
  );
}
