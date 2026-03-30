"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

// Back folder — Bybit
const BYBIT_ASSETS = [
  { label: "BTC", color: "#F7931A", amount: "3.21", krw: "₩ 51,200,000" },
  { label: "ETH", color: "#627EEA", amount: "28.5", krw: "₩ 104,300,000" },
  { label: "SOL", color: "#9945FF", amount: "120", krw: "₩ 27,500,000" },
];

// Front folder — Binance
const BINANCE_ASSETS = [
  { label: "BTC", color: "#F7931A", amount: "9.24", krw: "₩ 147,000,000" },
  { label: "ETH", color: "#627EEA", amount: "56.7", krw: "₩ 208,200,000" },
  { label: "SOL", color: "#9945FF", amount: "222", krw: "₩ 50,900,000" },
  { label: "USDT", color: "#26A17B", amount: "50,000", krw: "₩ 68,350,000" },
  { label: "XRP", color: "#23292F", amount: "24,500", krw: "₩ 46,000,000" },
  { label: "ADA", color: "#0033AD", amount: "18,200", krw: "₩ 12,500,000" },
];

export default function ReliefFolderSection() {
  const t = useTranslations("relief");
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v * 3);
  });

  // === Phase 1: Diagnosis + Folder (0→1.8) ===
  // Slow fade in over 0→0.5
  const diagFadeIn = Math.min(1, Math.max(0, progress / 0.5));
  const backP = Math.max(0, Math.min(1, (progress - 0.2) / 0.5));
  const frontP = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));
  const diagOpacity = diagFadeIn;

  // === Phase 2: Folder fades out slowly (1.6→2.2) ===
  const folderFadeOut = Math.max(0, Math.min(1, (progress - 1.6) / 0.6));
  const sectionOneOpacity = 1 - folderFadeOut;

  // === Phase 3: Relief text (2.1→3) ===
  const reliefFadeIn = Math.max(0, Math.min(1, (progress - 2.1) / 0.4));
  const reliefFadeOut = Math.max(0, Math.min(1, (progress - 2.8) / 0.2));
  const reliefOpacity = reliefFadeIn * (1 - reliefFadeOut);
  const reliefY = progress < 2.1
    ? 60
    : progress > 2.8
      ? -(progress - 2.8) * 100
      : (1 - reliefFadeIn) * 60;

  return (
    <div ref={containerRef} style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* === Section 1: Diagnosis + Folder === */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center gap-16 px-12 pointer-events-none"
          style={{ opacity: sectionOneOpacity }}
        >
          {/* Left — diagnosis text */}
          <div
            className="max-w-[340px] shrink-0"
            style={{
              opacity: diagOpacity,
              transform: `translateY(${(1 - Math.min(1, diagOpacity)) * 30}px)`,
              pointerEvents: diagOpacity > 0.5 && sectionOneOpacity > 0.5 ? "auto" : "none",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "6px 16px",
                borderRadius: 100,
                backgroundColor: "#f2f4f6",
                marginBottom: 16,
              }}
            >
              <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
                자산 현황
              </span>
            </div>
            <h2
              className="whitespace-pre-line"
              style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, fontSize: 36, marginBottom: 16 }}
            >
              {"내 해외 자산,\n한눈에 파악"}
            </h2>
            <p style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
              여러 거래소에 흩어진 자산을{"\n"}
              자동으로 모아 총액을 확인합니다.{"\n"}
              5억 초과 여부도 바로 알 수 있어요.
            </p>
          </div>

          {/* Right — stacked exchange folders */}
          <div
            className="shrink-0 relative"
            style={{ width: 480, height: 520 }}
          >
            {/* Back folder — Bybit (white) */}
            <div
              className="absolute top-0 left-0 right-0 rounded-[28px] bg-[#f8f9fa] border border-slate-200"
              style={{
                opacity: backP,
                transform: `translateX(${(1 - backP) * 60}px)`,
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div className="px-7 pt-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F7A600] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">B</span>
                  </div>
                  <span className="text-[17px] font-bold text-slate-800">Bybit</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">₩ 183,000,000</span>
              </div>
              <div className="px-5 pb-6">
                <div className="grid grid-cols-3 gap-3">
                  {BYBIT_ASSETS.map((coin, i) => {
                    const p = Math.min(1, Math.max(0, (backP - 0.3 - i * 0.12) / 0.3));
                    return (
                      <div
                        key={coin.label}
                        className="rounded-2xl aspect-square flex flex-col items-center justify-center gap-1"
                        style={{
                          backgroundColor: coin.color,
                          opacity: p,
                          transform: `scale(${0.9 + 0.1 * p})`,
                        }}
                      >
                        <span className="text-white/60 text-[10px] font-medium">{coin.label}</span>
                        <span className="text-white text-base font-bold">{coin.amount}</span>
                        <span className="text-white/40 text-[9px]">{coin.krw}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Front folder — Binance (dark) */}
            <div
              className="absolute left-[-16px] right-[-16px] rounded-[28px] bg-[#18181b]"
              style={{
                top: 160,
                opacity: frontP,
                transform: `translateY(${(1 - frontP) * 50}px)`,
                boxShadow: "0 -8px 40px rgba(0,0,0,0.2), 0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <div className="px-7 pt-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F3BA2F] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">B</span>
                  </div>
                  <span className="text-[17px] font-bold text-white">Binance</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-medium">₩ 532,950,000</span>
                  <div className="px-2.5 py-1 bg-red-500/15 border border-red-500/20 rounded-lg">
                    <span className="text-[10px] font-bold text-red-400">5억 초과</span>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-3 gap-3">
                  {BINANCE_ASSETS.map((coin, i) => {
                    const p = Math.min(1, Math.max(0, (frontP - 0.15 - i * 0.08) / 0.3));
                    return (
                      <div
                        key={coin.label}
                        className="rounded-2xl aspect-square flex flex-col items-center justify-center gap-1"
                        style={{
                          backgroundColor: coin.color + "20",
                          opacity: p,
                          transform: `translateY(${8 * (1 - p)}px)`,
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center mb-1"
                          style={{ backgroundColor: coin.color }}
                        >
                          <span className="text-white text-[9px] font-bold">{coin.label.charAt(0)}</span>
                        </div>
                        <span className="text-white text-sm font-bold">{coin.amount}</span>
                        <span className="text-white/30 text-[9px]">{coin.krw}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mx-5 mb-5 px-5 py-3.5 bg-white/5 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-500">총 해외 자산</span>
                <span className="text-[15px] font-bold text-white">₩ 823,450,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* === Section 2: Relief text === */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center z-10 pointer-events-none px-5"
          style={{ opacity: reliefOpacity, y: reliefY, paddingTop: "28vh" }}
        >
          <h2
            className="text-center whitespace-pre-line"
            style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, fontSize: 48 }}
          >
            {t("title")}
          </h2>
          <p
            className="text-center mt-5"
            style={{ fontWeight: 600, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}
          >
            {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
