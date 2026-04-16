"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby62DWdA6b4_2JTOs72zzzwmhPuiFWdK-bZgEqMvAvJ6B6KqCWQjUZ04ATSXanUnnOO/exec";

export default function NewsletterSection() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await fetch(
        `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}`,
        { method: "GET", mode: "no-cors" },
      );
      setEmail("");
      setStatus("done");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <div className="relative max-w-2xl mx-auto rounded-3xl border border-primary-100 bg-gradient-to-br from-white via-primary-50/30 to-primary-50/60 p-8 sm:p-12 overflow-hidden">
            {/* Decorative blur */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary-200/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-primary-200/15 blur-3xl pointer-events-none" />

            <div className="relative text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-600 mb-6">
                <Mail className="w-5 h-5 text-white" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 leading-tight mb-2">
                {t("title")}
              </h2>
              <p className="text-sm sm:text-base text-primary-400 mb-8 leading-relaxed max-w-md mx-auto">
                {t("subtitle")}
              </p>

              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center gap-2 py-4"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">{t("success")}</span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("placeholder")}
                      required
                      className="flex-1 min-w-0 px-4 py-3.5 rounded-xl border border-primary-200 bg-white text-sm text-primary-600 placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-300 transition-all shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white text-sm font-bold transition-all active:scale-[0.97] hover:bg-primary-700 disabled:opacity-60 disabled:pointer-events-none shadow-sm shadow-primary-600/20 whitespace-nowrap"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>{t("cta")}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {status === "error" && (
                <p className="mt-3 text-sm font-medium text-red-500">{t("error")}</p>
              )}

              <p className="mt-5 text-[11px] text-primary-300 leading-relaxed">
                {t("consent")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
