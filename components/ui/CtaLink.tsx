import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "instagram";

type CtaLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  children: ReactNode;
  /** Renders the diagonal arrow used on links that leave the site. */
  external?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-[0.8125rem] font-medium tracking-[0.08em] uppercase transition duration-300 px-7 py-4 min-h-12";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:bg-white",
  secondary: "border border-line-strong text-ink hover:bg-white/8 hover:border-white/40",
  ghost: "text-ink hover:text-white px-0 py-2",
  instagram: "instagram-gradient text-white hover:brightness-110",
};

/**
 * Every call to action on the site is a link — nothing here submits data,
 * so these are anchors rather than buttons by design.
 */
export function CtaLink({
  variant = "primary",
  external = false,
  children,
  className = "",
  ...props
}: CtaLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...externalProps} {...props}>
      {children}
      {external ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}
