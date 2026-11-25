import Link from "next/link";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { InquiryBand } from "@/components/sections/InquiryBand";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { HUNG_ART, ProductArt } from "@/components/product/ProductArt";
import { ProductCard } from "@/components/product/ProductCard";
import { homeCategoryTiles } from "@/data/categories";
import { countInCategory, publishedProducts } from "@/data/products";
import { company, publishedBuyers } from "@/data/company";
import { BuyerRelationshipGrid } from "@/components/sections/BuyerRelationshipGrid";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: { absolute: "MM Printers — Garment accessories & packaging, Dhaka" },
  alternates: { canonical: "/" },
};

const featuredSlugs = ["woven-label", "hang-tag", "jacquard-elastic", "leather-patch"];
const featured = featuredSlugs.map((slug) => publishedProducts.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => !!p);

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Company introduction */}
      <section id="intro" className="container-x section-y" aria-labelledby="intro-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 id="intro-title" className="display-md lg:col-span-6" data-reveal="up">
            Garment accessories, from specification to delivery.
          </h2>
          <div className="lg:col-span-5 lg:col-start-8" data-reveal="up">
            <p className="lede">
              MM Printers supplies garment accessories and packaging to the apparel industry from Dhaka. We coordinate
              your design and specifications at our office, communicate them to our production facility, supervise
              manufacturing, and arrange delivery to where you need it.
            </p>
            <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 border-t border-ink/15 text-base">
              {[
                ["Established", String(company.established)],
                ["Office", "Arambagh, Motijheel, Dhaka"],
                ["Model", "Factory-direct supply"],
                ["Catalogue", `${publishedProducts.length} products`],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="border-b border-ink/15 py-3 text-muted">{k}</dt>
                  <dd className="border-b border-ink/15 py-3 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="container-x pb-[var(--section)]" aria-labelledby="cats-title">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal="up">
          <h2 id="cats-title" className="display-md max-w-[14ch]">
            What we supply
          </h2>
          <Link href="/products" className="link-underline pb-1 font-medium">
            See all {publishedProducts.length} products
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" data-reveal="stagger">
          {homeCategoryTiles.map((t, i) => (
            <li
              key={t.category}
              data-reveal-item
              className={cn(i === 0 && "col-span-2 row-span-2", i >= 3 && "md:col-span-2", i === 3 && "col-span-2")}
            >
              <Link
                href={`/products?category=${t.category}`}
                className={cn(
                  "group trim-card flex h-full flex-col justify-between overflow-hidden p-5 md:p-6",
                  i === 0 ? "min-h-[22rem] md:min-h-[34rem]" : "min-h-[15rem] md:min-h-[16.5rem]",
                  i === 0 && "!bg-ink text-paper",
                )}
              >
                {HUNG_ART.has(t.art) && <span className="trim-hole" aria-hidden="true" />}
                <span className="flex justify-end text-sm tabular-nums opacity-70">{countInCategory(t.category)} products</span>
                <ProductArt
                  kind={t.art}
                  className={cn(
                    "mx-auto aspect-square w-auto max-w-full transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-105",
                    i === 0 ? "h-[13rem] md:h-[22rem]" : "h-[7.5rem] md:h-[10rem]",
                  )}
                />
                <span className={cn("font-display font-bold leading-tight [font-stretch:104%]", i === 0 ? "text-[length:var(--step-3)]" : "text-lg")}>
                  {t.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How an order is made: the spec sheet is the trade's own document, so it carries the section */}
      <section className="on-ink bg-ink text-paper" aria-labelledby="mfg-title">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="mfg-title" className="display-md" data-reveal="up">
              Accessories are small, but they hold up a shipment when they&rsquo;re late or wrong.
            </h2>
            <p className="mt-6 max-w-md text-muted-dark" data-reveal="up">
              So every order starts with the details agreed on paper: artwork, size, material, colours, finishing,
              quantity and delivery. Production works from that sheet, not from a message passed along.
            </p>
            <div className="mt-10" data-reveal="up">
              <Link href="/manufacturing" className="btn btn-signal">
                How an order is made
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SpecSheet tone="ink" />
          </div>
        </div>
      </section>

      {/* Quality preview */}
      <section className="container-x section-y" aria-labelledby="quality-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="quality-title" className="display-md lg:col-span-6" data-reveal="up">
            Quality is supervised, not assumed.
          </h2>
          <div className="lg:col-span-5 lg:col-start-8" data-reveal="up">
            <p className="text-muted">
              We confirm the specification, supervise production, check the finish, and tell you early if something
              needs a decision. Certifications and sustainability claims are published only with documents behind them.
            </p>
            <Link href="/quality" className="link-underline mt-6 inline-block font-medium">
              How we approach quality
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products: a visual break and a direct route into the catalogue */}
      <section className="bg-stone" aria-labelledby="featured-title">
        <div className="container-x section-y">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal="up">
            <h2 id="featured-title" className="display-md lg:col-span-7">
              Made to your specification
            </h2>
            <div className="lg:col-span-5">
              <p className="text-muted">
                A selection from the catalogue. Each is produced to the artwork and details you approve, then
                delivered to where you need it.
              </p>
              <Link href="/products" className="link-underline mt-4 inline-block font-medium">
                Browse all {publishedProducts.length} products
              </Link>
            </div>
          </div>
          <ul
            className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 [&_.trim-card]:!bg-paper [&_.trim-hole]:!bg-stone"
            data-reveal="stagger"
          >
            {featured.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {publishedBuyers.length > 0 && (
        <section className="container-x section-y" aria-labelledby="industry-title">
          <h2 id="industry-title" className="display-md" data-reveal="up">
            Who we work with
          </h2>
          <BuyerRelationshipGrid className="mt-12" />
        </section>
      )}

      <InquiryBand />
    </>
  );
}
