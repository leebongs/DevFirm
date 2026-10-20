import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDocAiEntry } from "@/content/docai-entry";
import type { Locale } from "@/content/locales";

export function DocasiReleaseNotesLink({ locale }: { locale: Locale }) {
  const entry = getDocAiEntry(locale);

  return (
    <Link
      href={entry.releaseNotesHref}
      className="text-primary hover:text-primary/80 focus-visible:ring-ring mt-2 inline-flex min-h-11 items-center gap-2 self-start rounded-md px-1 text-sm font-semibold underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
    >
      {entry.footer.releaseNotesAction}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}
