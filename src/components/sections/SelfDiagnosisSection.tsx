"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckSquare } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function SelfDiagnosisSection() {
  const t = useTranslations("diagnosis");
  const items: string[] = t.raw("items");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div ref={containerRef} className="max-w-xl mx-auto space-y-5">
          {items.map((item: string, i: number) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 bg-primary-50/30 border border-slate-200 rounded-xl p-5"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.3 + 0.2 }}
              >
                <CheckSquare className="w-6 h-6 text-primary-500 mt-0.5 flex-shrink-0" />
              </motion.div>
              <span className="text-base sm:text-lg text-slate-700">
                {item}
              </span>
            </motion.div>
          ))}

          <motion.p
            className="text-center text-lg font-semibold text-primary-700 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: items.length * 0.3 + 0.2 }}
          >
            {t("conclusion")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
