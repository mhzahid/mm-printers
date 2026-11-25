import { cn } from "@/lib/cn";

export function SectionHeading({
  title,
  intro,
  className,
  as: Tag = "h2",
  size = "md",
}: {
  title: string;
  intro?: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
  size?: "md" | "lg";
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end", className)} data-reveal="up">
      <Tag className={cn(size === "lg" ? "display-lg" : "display-md", "lg:col-span-7")}>{title}</Tag>
      {intro && <div className="lede text-[color:inherit] opacity-80 lg:col-span-5 lg:pb-1">{intro}</div>}
    </div>
  );
}
