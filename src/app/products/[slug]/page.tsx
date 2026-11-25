import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecifications } from "@/components/product/ProductSpecifications";
import { ProductCard } from "@/components/product/ProductCard";
import { ContentGap } from "@/components/ui/ContentGap";
import { InquiryBand } from "@/components/sections/InquiryBand";
import { getProductBySlug, getRelatedProducts, publishedProducts } from "@/data/products";
import { categoryById } from "@/data/categories";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const meta = pageMetadata({
    title: `${p.name} — ${categoryById[p.category].name}`,
    description: `${p.shortDescription} ${p.description}`.slice(0, 158),
    path: `/products/${p.slug}`,
  });
  if (p.image?.verified) meta.openGraph = { ...meta.openGraph, images: [{ url: p.image.src, alt: p.image.alt }] };
  return meta;
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const cat = categoryById[product.category];
  const related = getRelatedProducts(product, 4);
  const images = [product.image, ...(product.gallery ?? [])].filter((i): i is NonNullable<typeof i> => !!i);
  const hasDetail =
    !!product.materials?.length || !!product.colors?.length || !!product.sizes?.length || !!product.finishing?.length || !!product.specifications?.length;

  return (
    <>
      <div className="container-x pt-8 md:pt-12">
        <Breadcrumbs
          items={[
            { name: "Products", href: "/products" },
            { name: cat.name, href: `/products?category=${cat.id}` },
            { name: product.name, href: `/products/${product.slug}` },
          ]}
        />
      </div>

      <article className="container-x grid gap-10 pb-[var(--section)] pt-8 md:grid-cols-12 md:gap-8 md:pt-12 lg:gap-12">
        <div className="md:col-span-5 lg:col-span-6">
          <div className="lg:sticky lg:top-24">
            <ProductGallery name={product.name} art={product.art} images={images} />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:pt-4">
          <h1 className="display-md" data-reveal="up">
            {product.name}
          </h1>
          {product.originalName && product.originalName !== product.name && (
            <p className="mt-2 text-sm text-muted">Also listed as: {product.originalName}</p>
          )}
          <p className="lede mt-6">{product.shortDescription}</p>
          <p className="mt-4 max-w-xl text-muted">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/contact?type=quotation&product=${product.slug}`} className="btn btn-primary">
              Request a quote
            </Link>
            <Link href={`/contact?type=product&product=${product.slug}`} className="btn btn-ghost">
              Ask about this product
            </Link>
          </div>

          <ProductSpecifications product={product} className="mt-12" />

          {!hasDetail && (
            <div className="mt-10 rounded-md bg-stone p-5 text-base">
              <p>
                <strong className="font-semibold">Specifications are confirmed per order.</strong>{" "}
                <span className="text-muted">
                  Materials, sizes, colours and finishes are agreed with you before production. Send your requirement and
                  we&rsquo;ll confirm what we can produce.
                </span>
              </p>
            </div>
          )}
          <ContentGap>
            Confirmed materials, available variations, colours, sizes, finishing options and product photography for{" "}
            {product.name}.
          </ContentGap>

          <p className="mt-10 text-sm text-muted">
            Prefer to talk? Call{" "}
            <a href={`tel:${company.phone}`} className="link-underline text-ink">
              {company.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${company.email}?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}`} className="link-underline text-ink">
              {company.email}
            </a>
            .
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-stone/50" aria-labelledby="related-title">
          <div className="container-x section-y">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="display-md" data-reveal="up">
                Related products
              </h2>
              <Link href="/products" className="link-underline font-medium">
                Back to all products
              </Link>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4" data-reveal="stagger">
              {related.map((r) => (
                <li key={r.id}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <InquiryBand href={`/contact?type=quotation&product=${product.slug}`} />
    </>
  );
}
