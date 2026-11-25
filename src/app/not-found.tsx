import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x section-y">
      <p className="text-sm text-muted">Error 404</p>
      <h1 className="display-lg mt-4 max-w-[14ch]">This page isn&rsquo;t here.</h1>
      <p className="lede mt-6 text-muted">The link may be out of date. Try the product catalogue, or contact us and we&rsquo;ll help you find it.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/products" className="btn btn-primary">
          Browse products
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Contact us
        </Link>
      </div>
    </section>
  );
}
