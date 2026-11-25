import { workflow } from "@/data/company";
import { cn } from "@/lib/cn";

/**
 * The four-step factory-direct model. Horizontal on large screens with a rule
 * that draws across; vertical on small screens with a scroll-scrubbed progress line.
 */
export function WorkflowSteps({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const muted = tone === "ink" ? "text-muted-dark" : "text-muted";
  return (
    <div className={cn("relative", className)} data-timeline>
      {/* vertical progress line (mobile/tablet) */}
      <div aria-hidden="true" className="absolute bottom-2 left-[1.1rem] top-2 w-px bg-current opacity-20 lg:hidden" />
      <div aria-hidden="true" data-timeline-bar className="absolute bottom-2 left-[1.1rem] top-2 w-px bg-signal lg:hidden" />
      {/* horizontal rule (desktop) */}
      <div aria-hidden="true" className="absolute inset-x-0 top-[1.1rem] hidden h-px bg-current opacity-20 lg:block" />
      <div aria-hidden="true" data-reveal="line" className="absolute inset-x-0 top-[1.1rem] hidden h-px bg-signal lg:block" />

      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8" data-reveal="stagger">
        {workflow.map((step, i) => (
          <li key={step.title} data-reveal-item className="grid grid-cols-[2.25rem_1fr] gap-5 lg:block">
            <span
              className={cn(
                "relative z-10 grid size-9 place-items-center rounded-full font-display text-sm font-bold tabular-nums",
                tone === "ink" ? "bg-paper text-ink" : "bg-ink text-paper",
              )}
            >
              {i + 1}
            </span>
            <div className="lg:mt-8">
              <h3 className="title">{step.title}</h3>
              <p className={cn("mt-3 max-w-xs text-base", muted)}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
