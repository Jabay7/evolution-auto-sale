"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

type ShareButtonProps = {
  url: string;
  title: string;
  text: string;
};

/**
 * Opens the phone's share sheet where there is one, and copies the link
 * everywhere else. A button rather than a link because it acts on the page
 * itself; nothing is collected or sent anywhere.
 */
export function ShareButton({ url, title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ url, title, text });
      } catch {
        /* Dismissing the share sheet rejects; that is not an error. */
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* No clipboard access (an insecure origin, say): fall back to the URL bar. */
      window.location.href = url;
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line-strong px-4 text-[0.75rem] font-medium uppercase tracking-[0.06em] text-ink transition duration-300 hover:border-accent hover:text-accent"
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Link copied" : "Share card"}</span>
    </button>
  );
}
