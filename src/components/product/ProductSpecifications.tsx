import type { Product } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Spec-sheet table. Only rows with real data are rendered — no "N/A", no guesses.
 */
export function ProductSpecifications({ product, className }: { product: Product; className?: string }) {
  const rows: { label: string; value: React.ReactNode }[] = [];
  const list = (v?: string[]) => (v && v.length ? v.join(", ") : null);

  const add = (label: string, value: React.ReactNode | null | undefined) => {
    if (value !== null && value !== undefined && value !== "") rows.push({ label, value });
  };

  add("Material", list(product.materials));
  add("Variations", list(product.variations));
  add("Colours", list(product.colors));
  add("Sizes", list(product.sizes));
  add("Printing & finishing", list(product.finishing));
  add("Packaging", product.packaging);
  product.specifications?.forEach((s) => add(s.label, s.value));

  const uses = product.applications ?? [];
  if (!rows.length && !uses.length) return null;

  return (
    <div className={cn("grid gap-10", className)}>
      {rows.length > 0 && (
        <section aria-labelledby="spec-title">
          <h2 id="spec-title" className="title">
            Specifications
          </h2>
          <dl className="mt-4 border-t border-ink/15">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[minmax(8rem,38%)_1fr] gap-4 border-b border-ink/15 py-3 text-base">
                <dt className="text-muted">{r.label}</dt>
                <dd className="font-medium">{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {uses.length > 0 && (
        <section aria-labelledby="uses-title">
          <h2 id="uses-title" className="title">
            Typical uses
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {uses.map((u) => (
              <li key={u} className="rounded-full border border-ink/20 px-3.5 py-1.5 text-base">
                {u}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
