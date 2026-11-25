import Image from "next/image";
import { publishedMachines } from "@/data/company";

/** Shows documented machinery only. With none documented, states that plainly — no invented equipment. */
export function MachineryGrid() {
  if (!publishedMachines.length) {
    // Compact, honest note — the section leads with real content (the product list) instead.
    return (
      <aside className="flex flex-col gap-2 rounded-md border border-dashed border-white/25 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:p-6">
        <p className="font-semibold">Machinery photographs are being prepared.</p>
        <p className="text-base text-muted-dark sm:max-w-md">
          We&rsquo;ll add the equipment used for each product, with what it does. Until then, ask us about the process
          for any item.
        </p>
      </aside>
    );
  }
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
      {publishedMachines.map((m) => (
        <li key={m.id} data-reveal-item>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-stone">
            {m.image && <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />}
          </div>
          <h3 className="title mt-4">{m.name}</h3>
          <p className="mt-2 text-base opacity-80">{m.function}</p>
          <p className="mt-2 text-sm opacity-70">Used for: {m.productTypes.join(", ")}</p>
          {m.capabilities?.length ? (
            <dl className="mt-3 text-sm">
              {m.capabilities.map((c) => (
                <div key={c.label} className="flex gap-2">
                  <dt className="opacity-70">{c.label}:</dt>
                  <dd>{c.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
