import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ContentGap } from "@/components/ui/ContentGap";
import { company, fullAddress, timeline } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About us",
  description: `MM Printers is a factory-direct garment accessories supplier established in ${company.established} in Dhaka, Bangladesh. Learn how we work and what we value.`,
  path: "/about",
});

export default function AboutPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`;
  return (
    <>
      <PageHero
        title="About MM Printers"
        crumb={{ name: "About us", href: "/about" }}
        intro={
          <p>
            A garment accessories supplier established in Dhaka in {company.established}, working factory-direct for
            garment factories, buying houses and brands.
          </p>
        }
      />

      <section className="container-x pb-[var(--section)]" aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="story-title" className="display-md" data-reveal="up">
              What we do
            </h2>
            <dl className="mt-10 border-t border-ink/15 text-base" data-reveal="up">
              {[
                ["Established", String(company.established)],
                ["Office", fullAddress],
                ["Business", "Garment accessories and packaging"],
                ["Model", "Factory-direct supply"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-ink/15 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-5 text-[length:var(--step-1)] leading-relaxed lg:col-span-6 lg:col-start-7" data-reveal="up">
            <p>
              Garment production depends on a long list of small parts: labels, tags, buttons, elastics, patches and
              packaging. Each one has to match an approved specification and arrive before the line needs it.
            </p>
            <p className="text-muted">
              MM Printers exists to make that part of the job easier. We understand how garment orders are run, so we
              start by coordinating the product design and specification with you. We communicate the approved details to
              our production facility, supervise manufacturing through dedicated personnel, keep you updated on order
              status, and arrange delivery to your required destination.
            </p>
            <p className="text-muted">
              When something needs to change, we work it through with you. That is how we aim to build long-term
              relationships with the businesses we supply: by being reliable on the details.
            </p>
          </div>
        </div>
      </section>

      {/* A timeline earns its place once there are several verified milestones */}
      {timeline.length >= 3 && (
      <section className="bg-stone" aria-labelledby="timeline-title">
        <div className="container-x grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:items-center">
          <h2 id="timeline-title" className="display-md lg:col-span-5" data-reveal="up">
            Timeline
          </h2>
          <ol className="relative border-l-2 border-ink/20 pl-8 lg:col-span-6 lg:col-start-7">
            {timeline.map((t) => (
              <li key={t.year} className="relative pb-10 last:pb-0" data-reveal="up">
                <span aria-hidden="true" className="absolute -left-[2.45rem] top-[2.6rem] size-4 rounded-full border-4 border-stone bg-signal" />
                <p className="font-display text-[length:var(--step-5)] font-extrabold leading-none [font-stretch:90%]">{t.year}</p>
                <h3 className="title mt-3">{t.title}</h3>
                <p className="mt-2 text-muted">{t.body}</p>
              </li>
            ))}
          </ol>
          <div className="lg:col-span-12">
            <ContentGap>Later milestones with supporting information (new products, facility changes, key developments).</ContentGap>
          </div>
        </div>
      </section>
      )}

      <section className="bg-stone" aria-labelledby="visit-title">
        <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 id="visit-title" className="display-md" data-reveal="up">
              Visit the office in Motijheel
            </h2>
            <address className="mt-6 not-italic text-muted" data-reveal="up">
              {fullAddress}
            </address>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end" data-reveal="up">
            <a href={`tel:${company.phone}`} className="btn btn-signal">
              Call {company.phoneDisplay}
            </a>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Send an inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
