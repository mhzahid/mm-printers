import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/types";
import { categoryById } from "@/data/categories";
import { HUNG_ART, ProductArt } from "./ProductArt";
import { cn } from "@/lib/cn";

export function ProductCard({ product, className, priority = false }: { product: Product; className?: string; priority?: boolean }) {
  const cat = categoryById[product.category];
  return (
    <article className={cn("group relative", className)} data-reveal-item>
      <div className="trim-card aspect-[4/5] overflow-hidden">
        {HUNG_ART.has(product.art) && <span className="trim-hole" aria-hidden="true" />}
        {product.image?.verified ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]"
            priority={priority}
          />
        ) : (
          <ProductArt
            kind={product.art}
            className="absolute inset-[10%] size-[80%] transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-rotate-2 group-hover:scale-[1.06]"
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight [font-stretch:104%]">
            <Link
              href={`/products/${product.slug}`}
              className="after:absolute after:inset-0 after:rounded-md focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-signal"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-base leading-snug text-muted">{product.shortDescription}</p>
          {/* Category as trailing metadata, not an eyebrow above the name */}
          <p className="mt-2 line-clamp-1 text-sm text-muted" title={cat.name}>
            {cat.name}
          </p>
        </div>
      </div>
    </article>
  );
}
