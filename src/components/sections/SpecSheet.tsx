import { Check } from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";

/**
 * Illustrated spec sheet — the document a buyer and supplier agree on before production.
 * Purely illustrative; it shows the kind of information confirmed, not real order data.
 */
export function SpecSheet({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  // What each field asks the buyer to confirm. Real, generic guidance; no invented order data.
  const rows: [string, string][] = [
    ["Artwork", "Your file or a reference"],
    ["Dimensions", "Finished size"],
    ["Material", "Base and thread or ink"],
    ["Colours", "Colour references"],
    ["Finishing", "Cut, fold and edge"],
    ["Quantity", "Pieces per style"],
    ["Delivery", "Date and destination"],
  ];
  return (
    <figure className="relative" data-reveal="mask">
      <div data-parallax="0.05" className="rounded-md bg-white p-5 text-ink shadow-[0_30px_60px_-30px_rgb(23_26_28/0.35)] sm:p-7">
        <div className="border-b-2 border-ink pb-3">
          <span className="font-display text-sm font-bold [font-stretch:110%]">Specification sheet</span>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="trim-card aspect-[2/1] sm:aspect-square">
            <ProductArt kind="woven-label" className="absolute inset-0 m-auto h-[84%] w-auto max-w-[84%] sm:size-[84%]" />
          </div>
          <dl className="text-sm">
            {rows.map(([field, asks]) => (
              <div key={field} className="grid grid-cols-[4.75rem_1fr] items-baseline gap-2 border-b border-ink/10 py-2">
                <dt className="text-muted">{field}</dt>
                <dd className="font-medium leading-snug">{asks}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          {["Approved by buyer", "Sent to production"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-2.5 py-1">
              <Check className="size-3 text-signal" strokeWidth={3} aria-hidden="true" />
              {t}
            </span>
          ))}
        </div>
      </div>
      <figcaption className={`mt-5 text-sm ${tone === "ink" ? "text-muted-dark" : "text-muted"}`}>Illustration of the details we confirm before production.</figcaption>
    </figure>
  );
}
