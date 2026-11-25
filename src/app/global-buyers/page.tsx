import { PageHero } from "@/components/ui/PageHero";
import { InquiryBand } from "@/components/sections/InquiryBand";
import { BuyerRelationshipGrid } from "@/components/sections/BuyerRelationshipGrid";
import { ContentGap } from "@/components/ui/ContentGap";
import { publishedBuyers, publishedTestimonials } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Global buyers & industry relationships",
  description:
    "How MM Printers supports garment factories, buying houses and sourcing teams with garment accessories coordinated from design to delivery in Dhaka.",
  path: "/global-buyers",
});

const audiences = [
  {
    title: "Garment factories",
    needs: "Accessories that match the approved specification and arrive before the line needs them.",
    how: "We confirm the details before production, supervise manufacturing and arrange delivery to your factory.",
  },
  {
    title: "Buying houses",
    needs: "A supplier who answers quickly and keeps merchandisers informed on samples, changes and order status.",
    how: "Updates by mobile phone and email, and requested changes taken straight back to production.",
  },
  {
    title: "Sourcing teams and brands",
    needs: "Confidence that brand-critical items like labels and tags are reproduced as approved.",
    how: "Design and specification coordinated at our office, then communicated electronically to the production facility.",
  },
];


export default function GlobalBuyersPage() {
  return (
    <>
      <PageHero
        title="Global buyers"
        crumb={{ name: "Global buyers", href: "/global-buyers" }}
        intro={
          <p>
            Accessories are a small part of a garment order and a common cause of delay. We focus on making them
            predictable for the factories, buying houses and sourcing teams we work with.
          </p>
        }
      />

      <section className="container-x pb-[var(--section)]" aria-labelledby="industry-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="industry-title" className="display-md lg:col-span-6" data-reveal="up">
            Who we supply
          </h2>
          <p className="text-muted lg:col-span-5 lg:col-start-8" data-reveal="up">
            Since 2020 we have coordinated accessory orders in Dhaka: working through specifications with buyer
            representatives, talking to garment factories, and arranging delivery to where the goods are needed.
          </p>
        </div>
        <ContentGap>
          Confirm the relationship with SSL and Rapid Trims Ltd. (mentioned in the brief) and whether either may be
          named publicly. Supply approved buyer names/logos and genuine testimonials with written permission.
        </ContentGap>
        <div className="mt-12 grid gap-10 md:grid-cols-3" data-reveal="stagger">
          {audiences.map((a) => (
            <article key={a.title} data-reveal-item className="border-t-2 border-ink pt-5">
              <h3 className="title">{a.title}</h3>
              <p className="mt-4 text-sm font-semibold text-muted">What matters</p>
              <p className="mt-1">{a.needs}</p>
              <p className="mt-4 text-sm font-semibold text-muted">How we support it</p>
              <p className="mt-1 text-muted">{a.how}</p>
            </article>
          ))}
        </div>
      </section>

      {publishedBuyers.length > 0 && (
        <section className="container-x pb-[var(--section)]" aria-labelledby="buyers-title">
          <h2 id="buyers-title" className="display-md" data-reveal="up">
            Business relationships
          </h2>
          <BuyerRelationshipGrid className="mt-10" />
        </section>
      )}

      {publishedTestimonials.length > 0 && (
        <section className="container-x section-y" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title" className="display-md">
            What buyers say
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {publishedTestimonials.map((t) => (
              <li key={t.id}>
                <figure className="trim-card p-8">
                  <blockquote className="text-[length:var(--step-1)]">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm text-muted">
                    {t.name}, {t.role}, {t.company}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      <InquiryBand />
    </>
  );
}
