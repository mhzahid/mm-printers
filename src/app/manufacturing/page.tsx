import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { InquiryBand } from "@/components/sections/InquiryBand";
import { ManufacturingTimeline, type Stage } from "@/components/sections/ManufacturingTimeline";
import { MachineryGrid } from "@/components/sections/MachineryGrid";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { ContentGap } from "@/components/ui/ContentGap";
import { categories } from "@/data/categories";
import { publishedProducts } from "@/data/products";
import { publishedMachines } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Manufacturing & capabilities",
  description:
    "How MM Printers coordinates garment accessory production: design and specification at our Dhaka office, supervised manufacturing at our production facility, order updates and delivery.",
  path: "/manufacturing",
});

const stages: Stage[] = [
  {
    where: "Our office",
    title: "Requirement and design coordination",
    body: "We work through your requirement with you: the product, artwork, materials, quantity and when you need it. Anything unclear is settled here, before production.",
  },
  {
    where: "Office to facility",
    title: "Specification sent to production",
    body: "The agreed specification is communicated electronically to the production facility, so the people making your order work from the same approved details.",
  },
  {
    where: "Production facility",
    title: "Supervised manufacturing",
    body: "Dedicated personnel supervise production of your order and follow it through to finishing.",
  },
  {
    where: "Throughout",
    title: "Order-status updates",
    body: "We keep you informed by mobile phone and email, and take requested changes back to production.",
  },
  {
    where: "To your destination",
    title: "Delivery coordination",
    body: "Finished goods are packed and dispatched to your destination. Our delivery team is available 24/7 to coordinate dispatch, including urgent requirements; timing depends on the order and destination, and we confirm it when you order.",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        title="How orders are made"
        crumb={{ name: "Manufacturing & capabilities", href: "/manufacturing" }}
        intro={
          <p>
            We work factory-direct: one team coordinates your order from the first specification to delivery, working
            directly with the production facility.
          </p>
        }
      />

      {/* Design & specification */}
      <section className="container-x pb-[var(--section)]" aria-labelledby="spec-title">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 xl:col-span-5">
            <h2 id="spec-title" className="display-md" data-reveal="up">
              Design and specification
            </h2>
            <div className="mt-6 grid gap-4 text-muted" data-reveal="up">
              <p>
                Every accessory order starts with details that are easy to get wrong: the exact artwork, colours,
                dimensions, materials and finishing, and how the item will be applied to the garment.
              </p>
              <p>
                We coordinate these with you at our office in Motijheel, Dhaka. Once you approve the specification, it
                is sent electronically to the production facility. Production works from what you agreed, not from a
                phone message passed along.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-start-7">
            <SpecSheet />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-stone" aria-labelledby="process-title">
        <div className="container-x section-y">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28" data-reveal="up">
                <h2 id="process-title" className="display-md">
                  How an order moves
                </h2>
                <p className="mt-6 max-w-sm text-muted">
                  Five stages, one team. You talk to the same people from the first question to the delivered carton.
                </p>
              </div>
            </div>
            <ManufacturingTimeline stages={stages} className="lg:col-span-8 lg:col-start-5" />
          </div>
        </div>
      </section>

      {/* Capabilities & machinery */}
      <section className="on-ink bg-ink text-paper" aria-labelledby="machinery-title">
        <div className="container-x section-y">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="machinery-title" className="display-md lg:col-span-7" data-reveal="up">
              What we produce
            </h2>
            <p className="text-muted-dark lg:col-span-5" data-reveal="up">
              Every item in the catalogue goes through the same process. Pick a category or a product to see the
              details.
            </p>
          </div>

          <ul className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {categories.map((c) => {
              const items = publishedProducts.filter((p) => p.category === c.id);
              if (!items.length) return null;
              return (
                <li key={c.id} data-reveal-item className="border-t border-white/15 pt-4">
                  <h3>
                    <Link href={`/products?category=${c.id}`} className="font-sans text-[17px] font-semibold hover:text-signal">
                      {c.name}
                    </Link>
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-x-1 text-base text-muted-dark">
                    {items.map((p, i) => (
                      <li key={p.id}>
                        <Link href={`/products/${p.slug}`} className="inline-block py-1 underline decoration-white/25 underline-offset-4 hover:text-paper hover:decoration-signal">
                          {p.name}
                        </Link>
                        {i < items.length - 1 && <span aria-hidden="true">,</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          {publishedMachines.length > 0 && (
            <div className="mt-16">
              <MachineryGrid />
            </div>
          )}
          <ContentGap>Machinery list: name, photograph, function, product types and any documented capabilities.</ContentGap>
        </div>
      </section>

      <InquiryBand />
    </>
  );
}
