"use client";

import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function RiskWarningSection() {
  const t = useTranslations("risk");

  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-danger-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-danger-50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-danger-500" />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  {t("penalty")}
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-danger-600">
                <CountUp target={20} suffix="%" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-2xl border border-danger-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-danger-50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-danger-500" />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  {t("criminal")}
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900">
                {t("example")}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-danger-600 mt-1">
                {t("exampleResult")}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-xs text-slate-400">
            {t("source")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
