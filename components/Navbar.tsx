"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { bookingHref, navLinks, siteConfig } from "@/config/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { CtaLink } from "@/components/ui/CtaLink";
import { InstagramGlyph } from "@/components/ui/InstagramGlyph";
import { Wordmark } from "@/components/ui/Wordmark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = String(menuOpen);
    if (!menuOpen) return;

    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  useEffect(() => () => { delete document.body.dataset.menuOpen; }, []);

  return (
    <header
      className={`hero-veil fixed inset-x-0 top-0 z-50 border-b transition-[opacity,background-color,border-color,backdrop-filter] duration-500 ${
        menuOpen
          ? "border-line bg-bg"
          : scrolled
            ? "border-line bg-bg/75 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/65"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="evo-container flex h-20 items-center justify-between gap-6">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 py-2"
          aria-label={`${siteConfig.businessName} — back to top`}
        >
          <BrandMark />
          <Wordmark compact />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.8125rem] tracking-[0.02em] text-muted transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <CtaLink href={bookingHref} external variant="secondary" className="px-5 py-3">
              View Live Availability
            </CtaLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-mr-2 inline-flex size-12 items-center justify-center text-ink lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line bg-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="evo-container flex h-[calc(100svh-5rem)] flex-col justify-between py-10">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="display display-lg block py-3 text-ink/90 transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            <CtaLink href={bookingHref} external onClick={closeMenu} className="w-full">
              View Live Availability
            </CtaLink>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <InstagramGlyph className="size-4" />
              {siteConfig.instagramHandle}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
