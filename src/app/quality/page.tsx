import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ContentGap } from "@/components/ui/ContentGap";
import { publishedCertifications, publishedSustainability, qualityPractices } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Quality & sustainability",
  description:
    "How MM Printers approaches quality on garment accessory orders: specification confirmation, supervised production, attention to finishing and clear communication.",
  path: "/quality",
});


export default function QualityPage() {
  return (
    <>
      <PageHero
        title="Quality & sustainability"
        crumb={{ name: "Quality & sustainability", href: "/quality" }}
        intro={
          <p>
            Accessories are seen up close on every finished garment. Our approach to quality is practical and
            hands-on — and we&rsquo;re careful to claim only what we can show.
          </p>
        }
      />

      <section className="container-x pb-[var(--section)]" aria-labelledby="practices-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28" data-reveal="up">
              <h2 id="practices-title" className="display-md">
                How we look after quality
              </h2>
              <p className="mt-6 max-w-sm text-muted">
                This is how we work on every order. It describes our practice; it is not a certified quality management
                system.
              </p>
            </div>
          </div>
          <ul className="border-t border-ink/20 lg:col-span-7 lg:col-start-6" data-reveal="stagger">
            {qualityPractices.map((q) => (
              <li
                key={q.title}
                data-reveal-item
                className="grid gap-2 border-b border-ink/20 py-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-8"
              >
                <h3 className="font-display text-lg font-bold leading-snug">{q.title}</h3>
                <p className="text-muted">{q.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <ContentGap>Confirm the inspection steps actually performed (e.g. who inspects, at what stage, against what standard).</ContentGap>
      </section>

      {/* Certification and sustainability share one section: two short, evidence-led statements side by side */}
      <section className="container-x section-y" aria-label="Certifications and sustainability">
        <div className="grid gap-16 xl:grid-cols-2 xl:gap-12">
          <div data-reveal="up">
            <h2 id="cert-title" className="display-md">
              Certifications and compliance
            </h2>
            <div className="mt-8 max-w-xl">
            {publishedCertifications.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2">
                {publishedCertifications.map((c) => (
                  <li key={c.id} className="trim-card p-6">
                    {c.document && (
                      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded bg-white">
                        <Image src={c.document.src} alt={c.document.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain" />
                      </div>
                    )}
                    <h3 className="title">{c.name}</h3>
                    <dl className="mt-3 grid gap-1 text-sm">
                      <div><dt className="inline text-muted">Issued by: </dt><dd className="inline">{c.issuer}</dd></div>
                      <div><dt className="inline text-muted">Applies to: </dt><dd className="inline">{c.appliesTo}</dd></div>
                      {(c.validFrom || c.validTo) && (
                        <div><dt className="inline text-muted">Valid: </dt><dd className="inline">{[c.validFrom, c.validTo].filter(Boolean).join(" to ")}</dd></div>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="lede">
                  We publish certifications only with the supporting documents. If your supplier onboarding requires
                  compliance documentation, ask us what we can provide for your order.
                </p>
                <Link href="/contact?type=other" className="link-underline mt-6 inline-block font-medium">
                  Ask about documentation
                </Link>
              </>
            )}
            <ContentGap>Copies of any certificates or audit reports approved for publication (name, issuer, validity, entity covered).</ContentGap>
            </div>
          </div>
          <div className="xl:border-l xl:border-ink/15 xl:pl-12" data-reveal="up">
            <h2 id="sus-title" className="display-md">
              Sustainability
            </h2>
            <div className="mt-8 max-w-xl">
            {publishedSustainability.length > 0 ? (
              <ul className="grid gap-8">
                {publishedSustainability.map((s) => (
                  <li key={s.id} className="border-t border-ink/20 pt-5">
                    <h3 className="title">{s.title}</h3>
                    <p className="mt-2 text-muted">{s.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="lede">
                  We don&rsquo;t make environmental claims we can&rsquo;t document. As specific initiatives are
                  documented, we&rsquo;ll describe them here.
                </p>
                <p className="mt-5 text-muted">
                  If your brand has requirements for materials or packaging, include them in your inquiry and we&rsquo;ll
                  tell you plainly what we can and can&rsquo;t meet.
                </p>
              </>
            )}
            <ContentGap>Evidence for any sustainability initiatives (materials, waste, packaging, energy) before they are described.</ContentGap>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
