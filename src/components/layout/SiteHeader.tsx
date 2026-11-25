"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled
          ? "bg-paper/85 shadow-[0_1px_0_rgb(23_26_28/0.1)] backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-paper"
          : "bg-paper",
      )}
    >
      <div
        className={cn(
          "container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-out-quint)]",
          scrolled ? "h-16" : "h-[var(--header-h)] md:h-20",
        )}
      >
        <Link href="/" className="shrink-0 rounded-sm text-base" aria-label="MM Printers home">
          <Wordmark />
        </Link>
        <DesktopNavigation pathname={pathname} />
        <div className="flex items-center gap-2">
          <Link
            href="/contact?type=quotation"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="btn btn-signal hidden !min-h-11 !px-5 text-base sm:inline-flex"
          >
            Request a quote
          </Link>
          <MobileNavigation pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
