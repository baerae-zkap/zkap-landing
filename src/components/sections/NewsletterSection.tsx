"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, ArrowRight, CheckCircle, Loader2, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby62DWdA6b4_2JTOs72zzzwmhPuiFWdK-bZgEqMvAvJ6B6KqCWQjUZ04ATSXanUnnOO/exec";

const CONSENT_DETAILS = ["items", "purpose", "retention"] as const;

export default function NewsletterSection() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [agreed, setAgreed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;

    setStatus("loading");
    try {
      await fetch(
        `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}`,
        { method: "GET", mode: "no-cors" },
      );
      setEmail("");
      setAgreed(false);
      setDetailsOpen(false);
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
                    className="flex flex-col sm:flex-row sm:flex-wrap gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("placeholder")}
                      required
                      className="flex-1 min-w-0 px-4 py-3.5 rounded-xl border border-primary-200 bg-white text-sm text-primary-600 placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-300 transition-all shadow-sm"
                    />
                    <div className="text-left py-1 sm:order-last sm:basis-full">
                      <div className="flex items-start justify-between gap-3">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            required
                            className="peer sr-only"
                          />
                          <span
                            aria-hidden
                            className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/40 ${
                              agreed ? "border-primary-600 bg-primary-600" : "border-primary-200 bg-white"
                            }`}
                          >
                            {agreed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                          </span>
                          <span className="text-[13px] leading-5 text-primary-500">
                            <span className="font-semibold text-primary-600">{t("consent.required")}</span>{" "}
                            {t("consent.label")}
                          </span>
                        </label>
                        <button
                          type="button"
                          data-consent-toggle
                          aria-expanded={detailsOpen}
                          aria-controls="newsletter-consent-details"
                          onClick={() => setDetailsOpen((v) => !v)}
                          className="inline-flex shrink-0 items-center gap-0.5 text-[12px] leading-5 text-primary-400 hover:text-primary-600 transition-colors"
                        >
                          {detailsOpen ? t("consent.hide") : t("consent.show")}
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${detailsOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>

                      {detailsOpen && (
                        <div
                          id="newsletter-consent-details"
                          className="mt-3 ml-7 border-t border-primary-100 pt-3 text-[12px] leading-relaxed text-primary-400"
                        >
                          <dl className="space-y-1">
                            {CONSENT_DETAILS.map((key) => (
                              <div key={key} className="flex gap-3">
                                <dt className="w-16 shrink-0 font-medium text-primary-500">{t(`consent.${key}.label`)}</dt>
                                <dd>{t(`consent.${key}.value`)}</dd>
                              </div>
                            ))}
                          </dl>
                          <p className="mt-2">{t("consent.refusal")}</p>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading" || !agreed}
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-bold transition-all active:scale-[0.97] disabled:pointer-events-none whitespace-nowrap ${
                        agreed
                          ? "bg-primary-600 hover:bg-primary-700 disabled:opacity-60 shadow-sm shadow-primary-600/20"
                          : "bg-primary-200"
                      }`}
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
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
