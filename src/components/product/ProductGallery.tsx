"use client";

import Image from "next/image";
import { useState } from "react";
import type { ArtKind, ImageAsset } from "@/data/types";
import { HUNG_ART, ProductArt } from "./ProductArt";
import { cn } from "@/lib/cn";

/**
 * Product image gallery. Uses verified photography when supplied; otherwise shows
 * the studio illustration with a clear note that photography is to follow.
 */
export function ProductGallery({ name, art, images }: { name: string; art: ArtKind; images: ImageAsset[] }) {
  const photos = images.filter((i) => i.verified);
  const [index, setIndex] = useState(0);

  if (!photos.length) {
    return (
      <figure>
        <div className="trim-card aspect-square overflow-hidden" data-reveal="mask">
          {HUNG_ART.has(art) && <span className="trim-hole" aria-hidden="true" />}
          <ProductArt kind={art} label={name} className="absolute inset-[9%] size-[82%]" />
        </div>
        <figcaption className="mt-3 text-sm text-muted">Illustration. Product photography to follow.</figcaption>
      </figure>
    );
  }

  const current = photos[index];
  return (
    <div>
      <div className="trim-card relative aspect-square overflow-hidden" data-reveal="mask">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-[cardin_.4s_ease-out] object-cover"
        />
      </div>
      {photos.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Product images">
          {photos.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1} of ${photos.length}`}
                aria-current={i === index}
                className={cn("relative block aspect-square w-full overflow-hidden rounded-md ring-offset-2 ring-offset-paper", i === index ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100")}
              >
                <Image src={p.src} alt="" fill sizes="10vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
