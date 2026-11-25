import Link from "next/link";
import { company, fullAddress } from "@/data/company";
import { mainNav } from "@/data/navigation";
import { categories } from "@/data/categories";
import { Wordmark } from "@/components/ui/Wordmark";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="paper" className="text-lg" />
            <p className="mt-6 max-w-sm text-muted-dark">
              Garment accessories and packaging, coordinated from design to
              delivery. Established in Dhaka in {company.established}.
            </p>
            <address className="mt-8 grid gap-2 not-italic">
              <span className="text-muted-dark">{fullAddress}</span>
              <a href={`tel:${company.phone}`} className="link-underline w-fit">
                {company.phoneDisplay}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="link-underline w-fit"
              >
                {company.email}
              </a>
            </address>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7"
          >
            <div>
              <h2 className="mb-4 font-sans text-sm font-semibold text-muted-dark">
                Company
              </h2>
              <ul className="grid gap-2.5">
                {mainNav
                  .filter((n) => n.href !== "/products")
                  .map((n) => (
                    <li key={n.href}>
                      <Link href={n.href} className="hover:text-signal">
                        {n.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="sm:col-span-2">
              <h2 className="mb-4 font-sans text-sm font-semibold text-muted-dark">
                Products
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-8">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/products?category=${c.id}`}
                      className="hover:text-signal"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    className="font-semibold hover:text-signal"
                  >
                    All products
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pb-16 pt-6 text-sm text-muted-dark sm:flex-row sm:justify-between sm:pb-0 sm:pr-20 md:pr-12">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
