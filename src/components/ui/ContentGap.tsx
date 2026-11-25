/**
 * Review-only marker for information MM Printers still needs to supply.
 * Rendered only when NEXT_PUBLIC_SHOW_CONTENT_GAPS=true (use on staging, never in production).
 */
export function ContentGap({ children }: { children: React.ReactNode }) {
  if (process.env.NEXT_PUBLIC_SHOW_CONTENT_GAPS !== "true") return null;
  return (
    <aside className="my-6 rounded-md border-2 border-dashed border-signal bg-signal/10 p-4 text-sm text-ink">
      <strong className="font-semibold">Content needed before launch: </strong>
      {children}
    </aside>
  );
}
