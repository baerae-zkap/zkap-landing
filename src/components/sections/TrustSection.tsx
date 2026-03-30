"use client";

import { useTranslations } from "next-intl";
import { UserCheck, ShieldCheck, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const BADGE_ICONS = [UserCheck, ShieldCheck, Target];

export default function TrustSection() {
  const t = useTranslations("trust");
  const badges = t.raw("badges") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg text-slate-500 text-center mb-16">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i];
            return (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center h-full">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
