import Image from "next/image";
import { publishedBuyers } from "@/data/company";
import { cn } from "@/lib/cn";

/** Renders only buyers that are published AND approved for display. Renders nothing otherwise. */
export function BuyerRelationshipGrid({ className }: { className?: string }) {
  if (!publishedBuyers.length) return null;
  return (
    <ul className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-md bg-ink/15 md:grid-cols-4", className)}>
      {publishedBuyers.map((b) => (
        <li key={b.id} className="grid aspect-[3/2] place-items-center bg-paper p-6">
          {b.logo ? (
            <Image src={b.logo.src} alt={b.logo.alt} width={b.logo.width} height={b.logo.height} className="max-h-14 w-auto object-contain" />
          ) : (
            <span className="title text-center">{b.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
