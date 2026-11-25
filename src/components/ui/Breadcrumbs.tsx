import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export function Breadcrumbs({ items, tone = "ink" }: { items: { name: string; href: string }[]; tone?: "ink" | "paper" }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={tone === "ink" ? "text-muted" : "text-muted-dark"}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {all.map((it, i) => {
            const last = i === all.length - 1;
            return (
              <li key={it.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={tone === "ink" ? "text-ink" : "text-paper"}>
                    {it.name}
                  </span>
                ) : (
                  <>
                    <Link href={it.href} className="hover:underline">
                      {it.name}
                    </Link>
                    <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
