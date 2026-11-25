import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FacilityGallery } from "@/components/gallery/FacilityGallery";
import { ContentGap } from "@/components/ui/ContentGap";
import { publishedFacilityImages } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Facilities",
  description:
    "MM Printers' office in Motijheel, Dhaka, where garment accessory orders are coordinated, and the production facility where manufacturing is supervised.",
  path: "/facilities",
});

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Facilities"
        crumb={{ name: "Facilities", href: "/facilities" }}
        intro={
          <p>
            Orders are coordinated at our office in Arambagh, Motijheel, and made at our production facility, where
            dedicated personnel supervise manufacturing.
          </p>
        }
      />

      <section className="container-x pb-[var(--section)]" aria-labelledby="where-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 id="where-title" className="display-md lg:col-span-4" data-reveal="up">
            What happens where
          </h2>
          <dl className="border-t border-ink/20 lg:col-span-7 lg:col-start-6" data-reveal="stagger">
            {[
              [
                "Office, Arambagh, Motijheel",
                "Requirements, artwork and specifications are worked through with you. Order status and delivery are managed from here.",
              ],
              [
                "Production facility",
                "The approved specification arrives electronically from the office. Our personnel supervise manufacturing through to finishing.",
              ],
              ["Dispatch", "Finished goods are packed and sent to the destination you give us."],
            ].map(([place, what]) => (
              <div
                key={place}
                data-reveal-item
                className="grid gap-2 border-b border-ink/20 py-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="font-display text-lg font-bold leading-snug">{place}</dt>
                <dd className="text-muted">{what}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-10 lg:ml-[calc(5/12*100%)] lg:pl-2" data-reveal="up">
          <Link href="/manufacturing" className="link-underline font-medium">
            See how an order moves
          </Link>
        </p>
      </section>

      {publishedFacilityImages.length > 0 ? (
        <section className="container-x pb-[var(--section)]" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="display-md mb-10" data-reveal="up">
            Inside the work
          </h2>
          <FacilityGallery items={publishedFacilityImages} />
        </section>
      ) : (
        <section className="container-x pb-[var(--section)]" aria-labelledby="photos-title">
          <div className="awaiting-photo grid min-h-[16rem] content-end gap-3 rounded-md p-6 md:min-h-[22rem] md:p-10" data-reveal="mask">
            <h2 id="photos-title" className="font-display text-[length:var(--step-2)] font-bold leading-tight">
              Photographs of the office and production floor are being taken.
            </h2>
            <p className="max-w-xl text-muted">
              They&rsquo;ll appear here as they&rsquo;re approved. We don&rsquo;t use stock images to stand in for our
              facilities. If you&rsquo;d like to see the work in person, you&rsquo;re welcome at the office.
            </p>
          </div>
        </section>
      )}
      <ContentGap>
        Approved photographs (with title, caption, alt text and usage permission), and confirmation of what the
        production facility does and where it is, if it can be published.
      </ContentGap>
    </>
  );
}
