"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";
import AppDownloadButtons from "@/components/AppDownloadButtons";

export default function FinalCTASection() {
  const t = useTranslations("finalCta");

  return (
    <section
      id="download"
      className="relative overflow-hidden"
      style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}
    >
      {/* Background image + dim */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/cta-bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative max-w-content mx-auto px-5 text-center z-10 w-full py-28">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-pre-line mb-4">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg text-white/60 mb-10">{t("subtitle")}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <AppDownloadButtons size="lg" className="justify-center" />
        </ScrollReveal>
      </div>
    </section>
  );
}
