"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AppDownloadButtons from "@/components/AppDownloadButtons";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-content mx-auto px-5 py-24 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-200 rounded-full">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight whitespace-pre-line mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-slate-500 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <AppDownloadButtons size="lg" />
          </motion.div>
        </div>

        {/* App mockup placeholder */}
        <motion.div
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-72 h-[580px] bg-slate-100 rounded-[40px] border-4 border-slate-200 flex items-center justify-center">
            <span className="text-slate-400 text-sm">App Mockup</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
