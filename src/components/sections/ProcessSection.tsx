"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link2, Eye, UserCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const STEP_ICONS = [Link2, Eye, UserCheck];

export default function ProcessSection() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>;
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

        <div
          ref={containerRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4"
        >
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div key={i} className="flex items-center gap-4 sm:gap-4">
                <motion.div
                  className="flex flex-col items-center text-center w-48"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.25 }}
                >
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <div className="text-sm font-bold text-primary-600 mb-1">
                    Step {step.number}
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-1">
                    {step.title}
                  </div>
                  <div className="text-sm text-slate-500">
                    {step.description}
                  </div>
                </motion.div>

                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden sm:block w-12 h-0.5 bg-primary-200"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.25 + 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
