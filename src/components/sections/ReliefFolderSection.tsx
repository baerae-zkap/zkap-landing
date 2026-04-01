"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import ExchangeCard from "@/components/ExchangeCard";
import { EXCHANGE_DATA } from "@/components/sections/ExchangeAssetSection";
import useIsMobile from "@/hooks/useIsMobile";

const E = EXCHANGE_DATA;

const COIN_DATA = {
  btc:  { label: "BTC",  color: "#f7931a", logo: "/images/coins/btc.png" },
  eth:  { label: "ETH",  color: "#627eea", logo: "/images/coins/eth.webp" },
  sol:  { label: "SOL",  color: "#000000", logo: "/images/coins/sol.jpeg" },
  usdt: { label: "USDT", color: "#26a17b", logo: "/images/coins/usdt.png" },
  xrp:  { label: "XRP",  color: "#000000", logo: "/images/coins/xrp.webp" },
  kaia: { label: "KAIA", color: "#040404", logo: "/images/coins/kaia.png" },
};

const C = COIN_DATA;

const BINANCE_CARDS = [
  { ...C.btc,  balance: "₩ 147,000,000", sub: " " },
  { ...C.sol,  balance: "₩ 50,900,000",  sub: " " },
  { ...C.eth,  balance: "₩ 208,200,000", sub: " " },
  { ...C.kaia, balance: "₩ 12,500,000",  sub: " " },
  { ...C.usdt, balance: "₩ 68,350,000",  sub: " " },
  { ...C.xrp,  balance: "₩ 46,000,000",  sub: " " },
];

export default function ReliefFolderSection() {
  const t = useTranslations("relief");
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const mobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v * 4);
  });

  const diagFadeIn = Math.min(1, Math.max(0, progress / 0.5));
  const frontP = Math.max(0, Math.min(1, (progress - 0.2) / 0.5));
  const backP = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));
  const diagOpacity = diagFadeIn;

  const folderFadeOut = Math.max(0, Math.min(1, (progress - 2.0) / 0.4));
  const sectionOneOpacity = 1 - folderFadeOut;

  const reliefFadeIn = Math.max(0, Math.min(1, (progress - 2.3) / 0.4));
  const reliefFadeOut = Math.max(0, Math.min(1, (progress - 3.7) / 0.3));
  const reliefOpacity = reliefFadeIn * (1 - reliefFadeOut);
  const reliefY = progress < 2.3
    ? 60
    : progress > 3.7
      ? -(progress - 3.7) * 100
      : (1 - reliefFadeIn) * 60;

  const folderScale = mobile ? 0.7 : 1;

  return (
    <div ref={containerRef} style={{ height: "250vh" }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: "100dvh" }}>
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
          className="absolute inset-0 z-20 flex items-center justify-center md:justify-between gap-6 md:gap-0 px-5 md:px-6 pointer-events-none flex-col md:flex-row pt-6 md:pt-0 max-w-[1100px] mx-auto"
          style={{ opacity: sectionOneOpacity }}
        >
          {/* Left — diagnosis text */}
          <div
            className="max-w-[340px] shrink-0 text-center md:text-left"
            style={{
              opacity: diagOpacity,
              transform: `translateY(${(1 - Math.min(1, diagOpacity)) * 30}px)`,
              pointerEvents: diagOpacity > 0.5 && sectionOneOpacity > 0.5 ? "auto" : "none",
            }}
          >
            <h2
              className="whitespace-pre-line text-[28px] md:text-[44px]"
              style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, marginBottom: 12 }}
            >
              {t("diagTitle")}
            </h2>
            <p className="text-[15px] md:text-[17px] whitespace-pre-line" style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.7 }}>
              {t("diagSubtitle")}
            </p>
          </div>

          {/* Right — stacked exchange cards + Binance folder */}
          <div
            className="shrink-0 relative"
            style={mobile ? { width: "88vw", maxWidth: 420 } : { width: 480, height: 560 }}
          >
            {/* Back folder — Bithumb */}
            <div
              className={mobile ? "rounded-[20px]" : "absolute left-[10px] right-[10px] rounded-[28px]"}
              style={{
                ...(mobile ? {} : { top: 0 }),
                opacity: backP,
                transform: `translateX(${(1 - backP) * 40}px)`,
                zIndex: 5,
                backgroundColor: E.bithumb.color,
                boxShadow: "0 4px 30px rgba(0,0,0,0.15)",
                ...(mobile ? { marginBottom: -40, paddingBottom: 40 } : {}),
              }}
            >
              <div className="px-5 md:px-7 pt-5 md:pt-6 pb-3 md:pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={E.bithumb.logo} alt="Bithumb" className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-cover" />
                  <span className="text-[15px] md:text-[17px] font-bold text-white">Bithumb</span>
                </div>
              </div>
              {!mobile && <div style={{ height: 340 }} />}
            </div>

            {/* Front folder — Binance */}
            <div
              className={mobile ? "relative rounded-[20px] bg-[#18181b]" : "absolute left-0 right-0 rounded-[28px] bg-[#18181b]"}
              style={{
                ...(mobile ? {} : { top: 55 }),
                opacity: frontP,
                transform: `translateY(${(1 - frontP) * 50}px)`,
                zIndex: 10,
                boxShadow: "0 -8px 40px rgba(0,0,0,0.25), 0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <div className="px-5 md:px-7 pt-5 md:pt-6 pb-3 md:pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={E.binance.logo} alt="Binance" className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-cover" />
                  <span className="text-[15px] md:text-[17px] font-bold text-white">Binance</span>
                </div>
                <div className="px-3 py-1.5 bg-red-500/15 border border-red-500/20 rounded-lg flex items-center">
                  <span className="text-[12px] font-bold text-red-400 leading-none">{t("overBadge")}</span>
                </div>
              </div>
              <div className="px-3 md:px-5 pb-3 md:pb-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {BINANCE_CARDS.map((card, i) => {
                    const p = Math.min(1, Math.max(0, (frontP - 0.15 - i * 0.08) / 0.3));
                    return (
                      <div key={i} style={{ opacity: p, transform: `translateY(${8 * (1 - p)}px)` }}>
                        <ExchangeCard {...card} style={{ width: "100%", height: mobile ? 100 : 130 }} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mx-3 md:mx-5 mb-3 md:mb-5 px-3 md:px-5 py-2 md:py-4 bg-white/5 rounded-xl flex items-center justify-center">
                <span className="text-lg md:text-xl font-bold text-white">₩ 578,050,000</span>
              </div>
              <div className="h-2 md:h-0" />
            </div>
          </div>
        </div>

        {/* === Section 2: Relief text === */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center z-10 pointer-events-none px-5"
          style={{ opacity: reliefOpacity, y: reliefY, paddingTop: "35vh" }}
        >
          <h2
            className="text-center whitespace-pre-line text-[32px] sm:text-[40px] md:text-[48px]"
            style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3 }}
          >
            {t("title")}
          </h2>
          <p
            className="text-center mt-5 text-[15px] md:text-[17px] whitespace-pre-line"
            style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.7 }}
          >
            {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
