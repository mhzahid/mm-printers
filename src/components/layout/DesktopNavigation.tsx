"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { headerNav } from "@/data/navigation";
import { categories } from "@/data/categories";
import { countInCategory } from "@/data/products";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);

  // Close the menu when the route changes (state adjusted during render, per React docs).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const enter = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = Date.now();
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1 text-base font-medium">
        {headerNav.map((item) => {
          const active = isActive(pathname, item.href);
          const linkCls = cn(
            "relative rounded-full px-3 py-2 transition-colors hover:bg-stone",
            active && "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-[2px] after:bg-signal",
          );
          if (item.href !== "/products") {
            return (
              <li key={item.href}>
                <Link href={item.href} className={linkCls} aria-current={active ? "page" : undefined}>
                  {item.short}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.href} ref={wrapRef} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
              <div className="flex items-center">
                <Link href="/products" className={cn(linkCls, "pr-1")} aria-current={active ? "page" : undefined}>
                  Products
                </Link>
                <button
                  type="button"
                  className="grid size-7 place-items-center rounded-full hover:bg-stone"
                  aria-expanded={open}
                  aria-controls="products-menu"
                  aria-label="Product categories"
                  onClick={() => {
                    // A hover just opened it; a click right after should keep it open, not toggle it shut.
                    if (Date.now() - hoverOpenedAt.current < 500) return setOpen(true);
                    setOpen((v) => !v);
                  }}
                >
                  <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
                </button>
              </div>
              <div
                id="products-menu"
                className={cn(
                  "absolute left-1/2 top-full w-[min(44rem,90vw)] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-quint)]",
                  open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                )}
              >
                <div className="grid grid-cols-[1fr_13rem] overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-20px_rgb(23_26_28/0.35),0_0_0_1px_rgb(23_26_28/0.06)]">
                  <ul className="grid grid-cols-2 gap-x-2 p-3">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/products?category=${c.id}`}
                          className="flex items-baseline justify-between gap-3 rounded-md px-3 py-2.5 hover:bg-paper"
                          tabIndex={open ? 0 : -1}
                        >
                          <span>{c.name}</span>
                          <span className="text-sm tabular-nums text-muted">{countInCategory(c.id)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-between bg-ink p-5 text-paper">
                    <p className="text-sm leading-relaxed text-muted-dark">
                      27 garment accessories and packaging products, from woven labels to poly bags.
                    </p>
                    <Link
                      href="/products"
                      tabIndex={open ? 0 : -1}
                      className="mt-6 font-display text-lg font-bold underline decoration-signal decoration-2 underline-offset-4"
                    >
                      View the full catalogue
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
