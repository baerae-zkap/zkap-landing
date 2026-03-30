"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";

export default function ReliefSection() {
  const t = useTranslations("relief");

  return (
    <section className="py-28 sm:py-36 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-content mx-auto px-5 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight whitespace-pre-line mb-6">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl text-slate-500 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
