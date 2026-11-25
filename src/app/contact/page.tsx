import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContentGap } from "@/components/ui/ContentGap";
import { company, fullAddress, orderChecklist } from "@/data/company";
import { publishedProducts } from "@/data/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact & inquiries",
  description: `Request a quotation or ask about garment accessories and packaging. Call ${company.phoneDisplay}, email ${company.email}, or visit our office in Motijheel, Dhaka.`,
  path: "/contact",
});

type Search = Promise<{ type?: string; product?: string; category?: string; message?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const initial = {
    type: typeof sp.type === "string" ? sp.type : undefined,
    product: typeof sp.product === "string" ? sp.product : undefined,
    category: typeof sp.category === "string" ? sp.category : undefined,
    message: typeof sp.message === "string" ? sp.message.slice(0, 500) : undefined,
  };
  const productOptions = publishedProducts.map(({ slug, name, category }) => ({ slug, name, category }));
  const selected = publishedProducts.find((p) => p.slug === initial.product);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`;

  return (
    <>
      <PageHero
        title="Let's talk"
        crumb={{ name: "Contact", href: "/contact" }}
        intro={
          <p>
            Ask about a product, request a quotation or send us a specification. We reply by email or phone — whichever
            suits you.
          </p>
        }
      />

      <section className="container-x grid gap-14 pb-[var(--section)] lg:grid-cols-12 lg:gap-12">
        <aside className="lg:col-span-4" aria-label="Contact details">
          <div className="on-ink grid gap-8 rounded-md bg-ink p-7 text-paper md:p-9 lg:sticky lg:top-24">
            <h2 className="title">{company.name}</h2>
            <ul className="grid gap-6">
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-signal" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-dark">Phone</p>
                  <a href={`tel:${company.phone}`} className="link-underline text-lg font-medium">
                    {company.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-signal" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-dark">Email</p>
                  <a href={`mailto:${company.email}`} className="link-underline text-lg font-medium break-all">
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-signal" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-dark">Office</p>
                  <address className="not-italic leading-relaxed">{fullAddress}</address>
                  <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-block text-sm">
                    Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </li>
            </ul>
            {company.businessHours && (
              <p className="border-t border-white/10 pt-6 text-sm text-muted-dark">Office hours: {company.businessHours}</p>
            )}
            <div className="border-t border-white/10 pt-6">
              <p className="text-sm font-semibold text-muted-dark">Useful to include</p>
              <ul className="mt-3 grid gap-2 text-base">
                {orderChecklist.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="size-2.5 shrink-0 rounded-[2px] border border-white/45" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-dark">None of it is required to start.</p>
            </div>
            {selected && (
              <div className="border-t border-white/10 pt-6 text-sm">
                <p className="text-muted-dark">You&rsquo;re asking about</p>
                <Link href={`/products/${selected.slug}`} className="link-underline mt-1 inline-block font-medium">
                  {selected.name}
                </Link>
              </div>
            )}
          </div>
          <ContentGap>Confirmed office hours. Verified map pin for the office (embed only once the location is confirmed).</ContentGap>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm products={productOptions} initial={initial} />
        </div>
      </section>
    </>
  );
}
