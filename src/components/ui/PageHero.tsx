import { Fragment } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Inner-page opening: breadcrumb, then the title and intro side by side on a 12-column grid.
 *
 * The title measures its own column (container query) and scales down only as far as its
 * longest word needs, so REQUIREMENTS or SUSTAINABILITY always fit beside the intro without
 * breaking mid-word. Short titles stay at the full display size.
 */
/** Longest word across the site's page titles ("SUSTAINABILITY"). */
const TITLE_FIT_CHARS = 14;

export function PageHero({
  title,
  intro,
  crumb,
  aside,
}: {
  title: string;
  intro?: React.ReactNode;
  crumb: { name: string; href: string };
  aside?: React.ReactNode;
}) {
  // Every page title renders at ONE shared size (see .fit-title in globals.css): the size at which
  // the widest word in any current title, SUSTAINABILITY, fits the title column. A future title
  // with a longer word scales only itself down rather than overflowing.
  const words = title.split(/\s+/);
  const longestWord = Math.max(...words.map((w) => w.length));
  const fitScale = Math.max(1, longestWord / TITLE_FIT_CHARS);

  return (
    <section className="container-x pb-14 pt-8 md:pb-20 md:pt-12">
      <Breadcrumbs items={[crumb]} />
      <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-x-12">
        <div className="[container-type:inline-size] lg:col-span-8">
          <h1
            className="display-lg fit-title"
            style={fitScale > 1 ? ({ "--fit-scale": fitScale.toFixed(3) } as React.CSSProperties) : undefined}
            data-reveal="words"
          >
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span data-word className="inline-block">
                    {word}
                  </span>
                </span>
                {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </h1>
        </div>
        {(intro || aside) && (
          <div className="lg:col-span-4" data-reveal="up">
            {intro && <div className="lede text-muted">{intro}</div>}
            {aside}
          </div>
        )}
      </div>
      <div className="mt-14 h-px bg-ink/15" data-reveal="line" />
    </section>
  );
}
