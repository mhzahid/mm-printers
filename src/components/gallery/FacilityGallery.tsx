"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { FacilityImage } from "@/data/types";
import { cn } from "@/lib/cn";

// Phones: 2-up grid with the first and last frame full width. md+: art-directed 12-column layout.
const layout = ["col-span-2 md:col-span-7 md:row-span-2", "md:col-span-5", "md:col-span-5", "md:col-span-4", "md:col-span-4", "col-span-2 md:col-span-4"];
const ratio = ["aspect-[4/3] md:aspect-auto md:min-h-[24rem]", "aspect-[4/5] md:aspect-[16/10]", "aspect-[4/5] md:aspect-[16/10]", "aspect-[4/5] md:aspect-[5/4]", "aspect-[4/5] md:aspect-[5/4]", "aspect-[16/9] md:aspect-[5/4]"];

/**
 * Art-directed facility gallery with an accessible lightbox (native <dialog>:
 * focus is trapped and Escape closes it; arrow keys move between photos).
 * Items without a verified photograph render as clearly marked placeholders
 * and are not opened in the lightbox.
 */
export function FacilityGallery({ items }: { items: FacilityImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const photos = items.filter((i) => i.image?.verified);

  const open = (photoIndex: number) => {
    setActive(photoIndex);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((d: number) => setActive((a) => (a === null ? a : (a + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setActive(null);
    // Mouse convenience: a click anywhere except the controls closes the viewer.
    // (Keyboard users have Escape and the Close button.)
    const onBackdrop = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("button")) dlg.close();
    };
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("click", onBackdrop);
    return () => {
      dlg.removeEventListener("click", onBackdrop);
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = active !== null ? photos[active] : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4" data-reveal="stagger">
        {items.map((item, i) => {
          const photoIndex = photos.indexOf(item);
          const hasPhoto = photoIndex > -1 && item.image;
          return (
            <li key={item.id} className={cn("flex flex-col self-start md:self-stretch", layout[i % layout.length])} data-reveal-item>
              {hasPhoto ? (
                <button
                  type="button"
                  onClick={() => open(photoIndex)}
                  className={cn("group relative w-full md:flex-1 overflow-hidden rounded-md bg-stone", ratio[i % ratio.length])}
                  aria-label={`Open photo: ${item.title}`}
                >
                  <Image
                    src={item.image!.src}
                    alt={item.image!.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </button>
              ) : (
                <div className={cn("awaiting-photo relative flex w-full items-end p-3 md:flex-1 rounded-md md:p-4", ratio[i % ratio.length])}>
                  <span className="rounded-full bg-paper px-2.5 py-1 text-sm font-medium text-ink">Photo to follow</span>
                </div>
              )}
              <div className="mt-2.5 flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm leading-snug opacity-70">{item.caption}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? current.title : "Photo viewer"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/90 backdrop:backdrop-blur-sm open:animate-[cardin_.35s_ease-out]"
      >
        {current?.image && (
          <div className="flex h-full flex-col p-4 text-paper md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-dark">
                {active! + 1} / {photos.length}
              </p>
              <button type="button" onClick={close} className="grid size-11 place-items-center rounded-full bg-paper text-ink" aria-label="Close photo">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <figure className="relative my-4 flex-1">
              <Image key={current.image.src} src={current.image.src} alt={current.image.alt} fill sizes="100vw" className="animate-[cardin_.35s_ease-out] object-contain" />
            </figure>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold">{current.title}</p>
                <p className="text-sm text-muted-dark">{current.caption}</p>
              </div>
              {photos.length > 1 && (
                <div className="flex gap-2">
                  <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center rounded-full border border-white/30" aria-label="Previous photo">
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center rounded-full border border-white/30" aria-label="Next photo">
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
