"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Menu, Minus, Plus, X } from "lucide-react";
import { headerNav } from "@/data/navigation";
import { categories } from "@/data/categories";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";

const noopSubscribe = () => () => {};

export function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // true only in the browser (portal target exists); false during SSR — no effect needed.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Close the menu when the route changes (state adjusted during render, per React docs).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const raf = requestAnimationFrame(() => panel?.querySelector<HTMLElement>("button, a")?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="grid size-11 place-items-center rounded-full bg-ink text-paper xl:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={cn(
              "on-ink fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-ink text-paper xl:hidden",
              open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
            )}
            // Visibility flips instantly on open (so focus can move in) and only after the wipe on close.
            style={{
              transition: open
                ? "clip-path .5s var(--ease-out-quint)"
                : "clip-path .5s var(--ease-out-quint), visibility 0s linear .5s",
            }}
          >
            <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <span className="font-display text-lg font-bold">Menu</span>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full bg-paper text-ink"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-x flex-1 pb-8 pt-4">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {headerNav.map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li
                      key={item.href}
                      className={cn("transition-[opacity,transform] duration-500", open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
                      style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
                    >
                      {item.href === "/products" ? (
                        <>
                          <div className="flex items-center justify-between">
                            <Link href="/products" className="flex-1 py-4 font-display text-2xl font-bold" aria-current={active ? "page" : undefined}>
                              Products
                            </Link>
                            <button
                              type="button"
                              className="grid size-11 place-items-center rounded-full border border-white/20"
                              aria-expanded={catsOpen}
                              aria-controls="mobile-cats"
                              aria-label={catsOpen ? "Hide product categories" : "Show product categories"}
                              onClick={() => setCatsOpen((v) => !v)}
                            >
                              {catsOpen ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
                            </button>
                          </div>
                          <div
                            id="mobile-cats"
                            className={cn("grid transition-[grid-template-rows] duration-400", catsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                          >
                            <ul className="overflow-hidden">
                              {categories.map((c) => (
                                <li key={c.id}>
                                  <Link
                                    href={`/products?category=${c.id}`}
                                    tabIndex={catsOpen ? 0 : -1}
                                    className="block py-2 pl-4 text-muted-dark hover:text-paper"
                                  >
                                    {c.name}
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" aria-hidden="true" />
                            </ul>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn("block py-4 font-display text-2xl font-bold", active && "text-signal")}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 grid gap-3">
                <Link href="/contact?type=quotation" className="btn btn-signal w-full">
                  Request a quote
                </Link>
                <a href={`tel:${company.phone}`} className="btn btn-ghost w-full">
                  Call {company.phoneDisplay}
                </a>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
