"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFrameSequence from "@/components/ScrollFrameSequence";

const EXCHANGE_LOGOS = [
  "/images/exchanges/Binance.svg",
  "/images/exchanges/Bybit.svg",
  "/images/exchanges/OKX.svg",
  "/images/exchanges/Coinbase.svg",
];

const MOCKUP_FRAMES = Array.from(
  { length: 30 },
  (_, i) => `/images/mockup/frame-${String(i + 1).padStart(2, "0")}.svg`
);

export default function ExchangeAssetSection() {
  const t = useTranslations("exchange");

  return (
    <section className="bg-slate-50">
      <div className="py-24 sm:py-32">
        <div className="max-w-content mx-auto px-5 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-slate-500 mb-12">{t("subtitle")}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {EXCHANGE_LOGOS.map((logo, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 px-6 py-3 shadow-sm"
                >
                  <Image
                    src={logo}
                    alt={t(`exchanges.${i}`)}
                    width={120}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="h-24" />
      <ScrollFrameSequence frames={MOCKUP_FRAMES} />
    </section>
  );
}
