"use client";

import { useEffect } from "react";

/** Safety net: the interface appears on its own if nobody touches anything. */
const FALLBACK_MS = 6000;

/**
 * Holds the interface back on first load so the photograph is seen on its own,
 * then lets it fade in on the first scroll, tap or key press.
 *
 * Renders nothing — it only sets `data-hero-entered` on the root element, and
 * globals.css does the rest. The hidden state is gated on `data-js` like
 * .reveal is, so with JavaScript unavailable nothing is ever hidden, and the
 * watchdog in the root layout clears that flag if this bundle fails to
 * hydrate. prefers-reduced-motion skips the intro entirely.
 */
export function HeroIntro() {
  useEffect(() => {
    const root = document.documentElement;
    const enter = () => {
      root.dataset.heroEntered = "1";
    };

    /* Someone arriving at an anchor, or returning to a restored scroll
       position, has effectively already scrolled. */
    if (window.scrollY > 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      enter();
      return;
    }

    /* Deliberately broad. Between them these cover a wheel, a trackpad, a
       touch, a click and a key press on every browser worth naming; the first
       one to fire wins and the rest are torn down. */
    const events = [
      "wheel",
      "touchstart",
      "touchend",
      "pointerdown",
      "mousedown",
      "click",
      "keydown",
      "scroll",
    ] as const;
    let timer = 0;

    const cleanup = () => {
      window.clearTimeout(timer);
      for (const event of events) window.removeEventListener(event, onEvent);
    };

    function onEvent() {
      enter();
      cleanup();
    }

    timer = window.setTimeout(onEvent, FALLBACK_MS);
    for (const event of events) window.addEventListener(event, onEvent, { passive: true });

    return cleanup;
  }, []);

  return null;
}
