import { cn } from "@/lib/cn";

export type Stage = { title: string; body: string; where: string };

/**
 * Vertical process timeline. A real sequence, so stages are numbered.
 * The signal-orange line is scrubbed to scroll by MotionProvider ([data-timeline]).
 */
export function ManufacturingTimeline({ stages, className }: { stages: Stage[]; className?: string }) {
  return (
    <div className={cn("relative", className)} data-timeline>
      <div aria-hidden="true" className="absolute bottom-4 left-[1.35rem] top-4 w-[2px] bg-ink/10" />
      <div aria-hidden="true" data-timeline-bar className="absolute bottom-4 left-[1.35rem] top-4 w-[2px] bg-signal" />
      <ol className="relative grid gap-12 md:gap-16">
        {stages.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[2.75rem_1fr] gap-5 md:gap-8" data-reveal="up">
            <span className="relative z-10 grid size-11 place-items-center rounded-full bg-ink font-display font-bold tabular-nums text-paper ring-8 ring-stone">
              {i + 1}
            </span>
            <div className="max-w-xl pt-0.5">
              <h3 className="title">{s.title}</h3>
              {/* Where the stage happens: metadata after the title, not an eyebrow above it */}
              <p className="mt-1 text-sm font-medium text-ink/70">{s.where}</p>
              <p className="mt-3 text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
