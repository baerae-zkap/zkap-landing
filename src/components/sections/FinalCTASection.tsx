"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";
import AppDownloadButtons from "@/components/AppDownloadButtons";

export default function FinalCTASection() {
  const t = useTranslations("finalCta");

  return (
    <section
      id="download"
      className="py-28 sm:py-36 bg-gradient-to-b from-primary-50/50 to-white"
    >
      <div className="max-w-content mx-auto px-5 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight whitespace-pre-line mb-4">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg text-slate-500 mb-10">{t("subtitle")}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <AppDownloadButtons size="lg" className="justify-center" />
        </ScrollReveal>
      </div>
    </section>
  );
}
