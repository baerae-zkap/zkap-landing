"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const CARD_CONFIGS = [
  { bg: "#000000", image: "/images/diagnosis/card-1.png", titleColor: "#fff", descColor: "rgba(255,255,255,0.7)" },
  { bg: "#000000", image: "/images/diagnosis/card-2.png", titleColor: "#fff", descColor: "rgba(255,255,255,0.7)" },
  { bg: "#4574e2", image: "/images/diagnosis/card-3.png", titleColor: "#fff", descColor: "rgba(255,255,255,0.7)" },
  { bg: "#f9fafb", image: "/images/diagnosis/card-4.png", titleColor: "rgba(2,9,19,0.91)", descColor: "rgba(3,18,40,0.5)" },
  { bg: "#000000", image: "/images/diagnosis/card-5.png", titleColor: "#fff", descColor: "rgba(255,255,255,0.7)" },
];

interface DiagnosisItem {
  title: string;
  description: string;
}

export default function SelfDiagnosisSection() {
  const t = useTranslations("diagnosis");
  const items: DiagnosisItem[] = t.raw("items");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section style={{ padding: "120px 24px 160px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ScrollReveal>
          <h2
            style={{
              fontWeight: "bold",
              color: "#333d4b",
              lineHeight: 1.3,
              fontSize: 48,
              textAlign: "center",
            }}
          >
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p
            style={{
              marginTop: 20,
              fontWeight: 600,
              color: "#4e5968",
              lineHeight: 1.6,
              fontSize: 15,
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            {t("conclusion")}
          </p>
        </ScrollReveal>

        {/* Folder container */}
        <motion.div
          ref={containerRef}
          className="w-full max-w-[900px]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Folder tabs */}
          <div className="flex items-end gap-0">
            {/* Active tab */}
            <div
              className="px-6 py-3 rounded-t-2xl bg-[#1a1a1f] text-white relative z-10"
              style={{ marginBottom: -1 }}
            >
              <span className="text-sm font-bold">해외 자산 현황</span>
            </div>
            {/* Inactive tab */}
            <div
              className="px-5 py-2.5 rounded-t-xl bg-slate-200 text-slate-500 relative z-0"
              style={{ marginBottom: -1, marginLeft: -4 }}
            >
              <span className="text-xs font-medium">신고 내역</span>
            </div>
          </div>

          {/* Folder body */}
          <div className="bg-[#1a1a1f] rounded-2xl rounded-tl-none overflow-hidden">
            {/* Folder header — stats */}
            <div className="px-8 pt-7 pb-5 flex items-center justify-between border-b border-white/10">
              <div>
                <div className="text-xs text-slate-400 mb-1">총 해외 자산</div>
                <motion.div
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  ₩ 823,450,000
                </motion.div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1">연동 거래소</div>
                  <div className="text-lg font-bold text-white">4개</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1">보유 코인</div>
                  <div className="text-lg font-bold text-white">12종</div>
                </div>
                <motion.div
                  className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <span className="text-xs font-bold text-red-400">5억 초과 · 신고 대상</span>
                </motion.div>
              </div>
            </div>

            {/* Folder content — cards grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {items.map((item: DiagnosisItem, i: number) => {
                  const config = CARD_CONFIGS[i];
                  return (
                    <motion.div
                      key={i}
                      className="rounded-xl overflow-hidden"
                      style={{ backgroundColor: config.bg }}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      {/* Image */}
                      <div className="aspect-square flex items-center justify-center overflow-hidden p-3">
                        <motion.img
                          src={config.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                          initial={{ scale: 1.1 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                        />
                      </div>
                      {/* Text */}
                      <div className="px-3 pb-3">
                        <div
                          className="text-xs font-bold leading-tight"
                          style={{ color: config.titleColor }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="text-[10px] mt-1 leading-snug"
                          style={{ color: config.descColor }}
                        >
                          {item.description}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
