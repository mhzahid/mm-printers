import Link from "next/link";
import { Phone } from "lucide-react";
import { company, orderChecklist } from "@/data/company";

/**
 * Closing call to action. One message site-wide: send what you have, here is what helps.
 * The checklist is laid out like the ruled fields of an order sheet, so the band tells the
 * visitor what to prepare instead of just asking them to get in touch.
 */
export function InquiryBand({
  title = "Send us what you have.",
  href = "/contact?type=quotation",
}: {
  title?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="inquiry-band-title">
      <div className="container-x section-y grid gap-12 border-t border-ink/15 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" data-reveal="up">
          <h2 id="inquiry-band-title" className="display-md max-w-[14ch]">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-muted">
            An artwork file, a trim card or a photo of the sample is enough to start. We&rsquo;ll reply by email or phone
            with what we can make.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={href} className="btn btn-signal">
              Request a quote
            </Link>
            <a href={`tel:${company.phone}`} className="btn btn-ghost">
              <Phone className="size-4" aria-hidden="true" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal="up">
          <p className="text-sm font-semibold text-muted">Useful to include</p>
          <ul className="mt-3 border-t border-ink/20">
            {orderChecklist.map((item) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-ink/20 py-3.5">
                <span aria-hidden="true" className="size-3 shrink-0 translate-y-[0.05em] rounded-[2px] border border-ink/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
