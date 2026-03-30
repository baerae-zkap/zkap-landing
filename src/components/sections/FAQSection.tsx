"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base sm:text-lg font-semibold text-slate-900 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base text-slate-500 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem question={item.question} answer={item.answer} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
