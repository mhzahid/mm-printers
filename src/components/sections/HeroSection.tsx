import Link from "next/link";
import { ProductArt } from "@/components/product/ProductArt";
import { HeroMotion } from "./HeroMotion";
import type { ArtKind } from "@/data/types";

// Each piece carries its own caption, so label and object move together (load sequence and scroll drift)
// and the caption never sits over another piece. `capPull` lifts the caption from the bottom of the
// square art box up to just under the drawn object (percent of the piece width).
const board: { kind: ArtKind; label: string; href: string; cls: string; capPull: string }[] = [
  { kind: "hang-tag", label: "Hang tag", href: "/products/hang-tag", cls: "left-[0%] top-[1%] w-[56%]", capPull: "-mt-[12%]" },
  { kind: "woven-label", label: "Woven label", href: "/products/woven-label", cls: "right-[0%] top-[0%] w-[48%]", capPull: "-mt-[35%]" },
  { kind: "horn-button", label: "Horn button", href: "/products/horn-button", cls: "right-[3%] top-[28%] w-[40%]", capPull: "-mt-[15%]" },
  { kind: "care-label", label: "Care label", href: "/products/care-label", cls: "left-[5%] top-[49%] w-[30%]", capPull: "-mt-[10%]" },
  { kind: "leather-patch", label: "Leather patch", href: "/products/leather-patch", cls: "left-[30%] bottom-[2%] w-[38%]", capPull: "-mt-[26%]" },
  { kind: "drawcord", label: "Draw cord", href: "/products/drawstring-draw-cord", cls: "right-[0%] bottom-[1%] w-[34%]", capPull: "-mt-[12%]" },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="container-x grid gap-10 pb-16 pt-6 md:pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="flex flex-col lg:col-span-7 lg:pt-10">
          <h1 id="hero-title" className="display-xl !text-[clamp(2.75rem,1rem+6.4vw,6rem)] ![font-stretch:84%] !leading-[0.88]" aria-label="The details behind every great garment.">
            {["The details", "behind every", "great garment."].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
                <span className="hero-line block will-change-transform">{line}</span>
              </span>
            ))}
          </h1>

          <div className="hero-fade mt-10 grid gap-8 md:grid-cols-[minmax(0,26rem)_auto] md:items-end lg:mt-auto lg:grid-cols-1 lg:gap-4 lg:pt-10 xl:grid-cols-[minmax(0,26rem)_auto] xl:gap-8">
            <p className="lede">
              Labels, tags, buttons, elastics, patches and packaging, made to your approved specification and
              delivered when the line needs them.
            </p>
            <p className="text-sm leading-relaxed text-muted md:max-w-[15rem]">
              A factory-direct supplier to garment manufacturers, buying houses and brands. Dhaka, since 2020.
            </p>
          </div>
          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              Explore products
            </Link>
            <Link href="/contact?type=quotation" className="btn btn-ghost">
              Request a quote
            </Link>
          </div>
        </div>

        {/* Art-directed trims board: an arrangement of accessories, each linking to its product page */}
        <div className="lg:col-span-5" data-parallax="0.06">
          <div id="hero-board" className="trim-card relative aspect-[4/5] w-full sm:aspect-[5/5] lg:aspect-[4/5]">
            <span className="trim-hole" aria-hidden="true" />
            <ul className="absolute inset-0" aria-label="Featured accessories">
              {board.map((b) => (
                <li key={b.kind}>
                  <Link href={b.href} className={`hero-piece group pointer-events-none absolute flex flex-col items-center focus-visible:outline-none ${b.cls}`}>
                    {/* Only the drawn object and its caption take the pointer, so transparent corners of one
                        piece never steal clicks from a neighbour's caption. */}
                    <ProductArt
                      kind={b.kind}
                      className="w-full transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-105 [&_g]:[pointer-events:visiblePainted]"
                    />
                    <span
                      className={`hero-cap pointer-events-auto relative rounded-full bg-paper px-2.5 py-1 text-sm font-medium shadow-[0_1px_2px_rgb(23_26_28/0.08)] transition-colors group-hover:bg-ink group-hover:text-paper group-focus-visible:bg-ink group-focus-visible:text-paper group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-signal ${b.capPull}`}
                    >
                      {b.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <HeroMotion />
    </section>
  );
}
