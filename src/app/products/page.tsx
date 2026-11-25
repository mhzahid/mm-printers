import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCatalogue } from "@/components/product/ProductCatalogue";
import { InquiryBand } from "@/components/sections/InquiryBand";
import { publishedProducts } from "@/data/products";
import { categoryById, isCategoryId } from "@/data/categories";
import { pageMetadata } from "@/lib/metadata";

type Search = Promise<{ category?: string; q?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const { category } = await searchParams;
  if (isCategoryId(category)) {
    const c = categoryById[category];
    return {
      ...pageMetadata({ title: c.name, description: `${c.summary} From MM Printers, Dhaka.`, path: `/products?category=${category}` }),
    };
  }
  return pageMetadata({
    title: "Products",
    description:
      "Catalogue of garment accessories and packaging from MM Printers: labels, heat transfers, hang tags, patches, buttons, elastics, drawcords, lace and poly bags.",
    path: "/products",
  });
}

export default async function ProductsPage({ searchParams }: { searchParams: Search }) {
  const { category, q } = await searchParams;
  return (
    <>
      <PageHero
        title="Products"
        crumb={{ name: "Products", href: "/products" }}
        intro={
          <p>
            {publishedProducts.length} garment accessories and packaging products. Orders are coordinated to your
            artwork and specification. Ask us about options for anything you see here.
          </p>
        }
      />
      <section className="container-x pb-[var(--section)]">
        <ProductCatalogue
          key={`${category ?? "all"}|${q ?? ""}`}
          products={publishedProducts}
          initialCategory={isCategoryId(category) ? category : null}
          initialQuery={typeof q === "string" ? q.slice(0, 80) : ""}
        />
      </section>
      <InquiryBand title="Can't see what you need?" />
    </>
  );
}
