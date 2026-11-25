"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { CategoryId, Product } from "@/data/types";
import { categories, categoryById } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";

function normalise(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

function matches(p: Product, terms: string[]) {
  if (!terms.length) return true;
  const hay = normalise(
    [p.name, p.originalName, p.shortDescription, categoryById[p.category].name, ...(p.alsoIn ?? []).map((c) => categoryById[c].name), ...(p.applications ?? []), ...(p.materials ?? [])]
      .filter(Boolean)
      .join(" "),
  );
  return terms.every((t) => hay.includes(t));
}

export function ProductCatalogue({
  products,
  initialCategory,
  initialQuery,
}: {
  products: Product[];
  initialCategory: CategoryId | null;
  initialQuery: string;
}) {
  const [category, setCategory] = useState<CategoryId | null>(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  // Keep the URL shareable without triggering a server round trip.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (deferredQuery.trim()) params.set("q", deferredQuery.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/products?${qs}` : "/products");
  }, [category, deferredQuery]);

  const terms = useMemo(() => normalise(deferredQuery).split(" ").filter(Boolean), [deferredQuery]);

  const counts = useMemo(() => {
    const base = products.filter((p) => matches(p, terms));
    const map = new Map<CategoryId | "all", number>([["all", base.length]]);
    for (const c of categories) map.set(c.id, base.filter((p) => p.category === c.id || p.alsoIn?.includes(c.id)).length);
    return map;
  }, [products, terms]);

  const results = useMemo(
    () => products.filter((p) => (!category || p.category === category || p.alsoIn?.includes(category)) && matches(p, terms)),
    [products, category, terms],
  );

  const reset = () => {
    setQuery("");
    setCategory(null);
    inputRef.current?.focus();
  };

  const activeCat = category ? categoryById[category] : null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Filters */}
      <aside className="min-w-0 lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search, e.g. label, button"
              autoComplete="off"
              className="field !rounded-full !pl-10 !pr-10"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full hover:bg-stone"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </form>

          <fieldset className="mt-8 min-w-0">
            <legend className="mb-3 text-sm font-semibold">Category</legend>
            <ul className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-1 [mask-image:linear-gradient(to_right,black_88%,transparent)] [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:[mask-image:none] [&::-webkit-scrollbar]:hidden">
              {[{ id: null, name: "All products" } as { id: CategoryId | null; name: string }, ...categories].map((c) => {
                const active = category === c.id;
                const count = counts.get(c.id ?? "all") ?? 0;
                return (
                  <li key={c.id ?? "all"} className="shrink-0">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        "flex w-full items-baseline justify-between gap-3 whitespace-nowrap rounded-full border px-4 py-2.5 text-left text-base transition-colors lg:whitespace-normal lg:rounded-md lg:border-transparent lg:px-3 lg:py-2",
                        active ? "border-ink bg-ink text-paper" : "border-ink/20 hover:bg-stone",
                        count === 0 && !active && "opacity-50",
                      )}
                    >
                      <span>{c.name}</span>
                      <span className={cn("text-sm tabular-nums", active ? "text-paper/70" : "text-muted")}>{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>
      </aside>

      {/* Results */}
      <div className="lg:col-span-9">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-4">
          <h2 className="title">{activeCat ? activeCat.name : "All products"}</h2>
          <p className="text-sm text-muted" aria-live="polite" aria-atomic="true">
            {results.length} {results.length === 1 ? "product" : "products"}
            {deferredQuery.trim() ? ` matching “${deferredQuery.trim()}”` : ""}
          </p>
        </div>
        {activeCat && <p className="-mt-4 mb-8 max-w-xl text-muted">{activeCat.summary}</p>}

        {results.length > 0 ? (
          <ul key={`${category}-${terms.join("-")}`} className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3">
            {results.map((p, i) => (
              <li key={p.id} className="animate-[cardin_.5s_var(--ease-out-quint)_both]" style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}>
                <ProductCard product={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="trim-card px-6 py-16 text-center md:py-24">
            <h3 className="title">No products match that search.</h3>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Try a broader word such as “label” or “button”, or clear the filters. If you can’t find what you need, ask
              us — we may still be able to help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reset} className="btn btn-primary">
                Clear filters
              </button>
              <Link href={`/contact?type=product${query ? `&message=${encodeURIComponent(`Looking for: ${query}`)}` : ""}`} className="btn btn-ghost">
                Ask about a product
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
