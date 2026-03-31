"use client";

import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import ExchangeCard from "@/components/ExchangeCard";
import useIsMobile from "@/hooks/useIsMobile";

// Shared exchange data
export const EXCHANGE_DATA = {
  binance:  { label: "Binance",  color: "#333333", logo: "/images/exchanges/binance.png" },
  bybit:    { label: "Bybit",    color: "#000000", logo: "/images/exchanges/bybit.jpg" },
  okx:      { label: "OKX",      color: "#000000", logo: "/images/exchanges/okx.png" },
  coinbase: { label: "Coinbase", color: "#1653f0", logo: "/images/exchanges/coinbase.webp" },
  upbit:    { label: "Upbit",    color: "#093687", logo: "/images/exchanges/upbit.png" },
  bithumb:  { label: "Bithumb",  color: "#ff6d00", logo: "/images/exchanges/bithumb.jpg" },
  coinone:  { label: "Coinone",  color: "#004ce4", logo: "/images/exchanges/coinone.png" },
  korbit:   { label: "Korbit",   color: "#000000", logo: "/images/exchanges/korbit.png" },
} as const;

const E = EXCHANGE_DATA;

const CARDS = [
  // Row 1 (top)
  { ...E.upbit, x: -300, y: -200, featured: true, balance: "₩ 82,300,000" },
  { ghost: true, x: -200, y: -300 },
  { ...E.okx, x: -100, y: -160, featured: true, balance: "₩ 178,400,000" },
  { ghost: true, x: 200, y: -300 },
  { ghost: true, x: 420, y: -280 },

  // Row 2
  { ...E.korbit, x: -380, y: -10, featured: true, balance: "₩ 12,500,000" },
  { ghost: true, x: -290, y: -100 },
  // center = Binance
  { ...E.coinbase, x: 170, y: -100, featured: true, balance: "₩ 87,300,000" },
  { ...E.bybit, x: 380, y: 50, featured: true, balance: "₩ 183,000,000" },

  // Row 3
  { ghost: true, x: -500, y: 110 },
  { ...E.coinone, x: -290, y: 200, featured: true, balance: "₩ 28,700,000" },
  { ...E.bithumb, x: 320, y: 220, featured: true, balance: "₩ 45,100,000" },
  { ghost: true, x: 500, y: 110 },

  // Row 4 (bottom)
  { ghost: true, x: -420, y: 280 },
  { ghost: true, x: -200, y: 300 },
  { ghost: true, x: 0, y: 310 },
  { ghost: true, x: 200, y: 300 },
  { ghost: true, x: 420, y: 280 },
] as const;

const SELECTED = E.binance;

const ASSETS = [
  { coin: "BTC", amount: "9.24 BTC", krw: "₩ 147,000,000", logo: "/images/coins/btc.png" },
  { coin: "ETH", amount: "56.7 ETH", krw: "₩ 208,200,000", logo: "/images/coins/eth.webp" },
  { coin: "SOL", amount: "222 SOL", krw: "₩ 50,900,000", logo: "/images/coins/sol.jpeg" },
  { coin: "USDT", amount: "50,000 USDT", krw: "₩ 68,350,000", logo: "/images/coins/usdt.png" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export default function ExchangeAssetSection() {
  const t = useTranslations("exchange");
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const mobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v * 9);
  });

  // === Phase 1: Cards spread (0→1.2) — center is same size as others ===
  const spreadP = Math.min(1, Math.max(0, (progress - 0.2) / 1.0));
  const titleOpacity = Math.min(1, progress / 0.3);

  // === Phase 2: Selection (1.8→3) — Binance grows, then click ===
  const selectP = Math.min(1, Math.max(0, (progress - 1.8) / 1.0));
  const surroundDim = lerp(0.6, 0.25, selectP);

  // Selection: hold → click(dip) → grow continuously while balance animates
  let centerGrow: number;
  if (selectP < 0.20) {
    centerGrow = 0.45;                                          // hold at initial size
  } else if (selectP < 0.33) {
    centerGrow = lerp(0.45, 0.38, (selectP - 0.20) / 0.13);   // press down (click)
  } else if (selectP < 0.90) {
    centerGrow = lerp(0.38, 0.7, (selectP - 0.33) / 0.57);    // bounce back + grow continuously to max
  } else {
    centerGrow = 0.7;                                           // hold at max
  }

  // Connected + balance start during growth
  const connectedP = Math.min(1, Math.max(0, (selectP - 0.40) / 0.55));
  // Green glow: flash on click, fade out smoothly over entire growth
  const glowFlash = selectP >= 0.33 && selectP < 0.85
    ? Math.min(1, (selectP - 0.33) / 0.06) * Math.max(0, 1 - (selectP - 0.39) / 0.46)
    : 0;

  // === Phase 3: Others fade, card moves left (2.8→3.6) ===
  const fadeOutP = Math.min(1, Math.max(0, (progress - 2.8) / 0.6));
  const surroundOpacity = spreadP * (1 - fadeOutP);

  // === Phase 4: "자산 확인" (3.5→7) ===
  const assetP = Math.min(1, Math.max(0, (progress - 3.5) / 0.5));
  const assetFadeOut = Math.min(1, Math.max(0, (progress - 6.5) / 0.4));

  // === Phase 5: "전문가 신고" (7→9) ===
  const filingP = Math.min(1, Math.max(0, (progress - 7.0) / 0.5));
  const stepsP = Math.min(1, Math.max(0, (progress - 7.3) / 1.5));

  // Center card position through phases
  const phase12Scale = centerGrow;
  // Phase 3: move left
  const phase3X = lerp(0, mobile ? 0 : -380, fadeOutP);
  const phase3Scale = lerp(phase12Scale, 1.0, fadeOutP);

  // Phase 5: card flies away
  const flyP = Math.min(1, Math.max(0, (progress - 7.0) / 1.8));
  const flyX = lerp(phase3X, 600, flyP);
  const flyY = lerp(0, -400, flyP);
  const flyScale = lerp(phase3Scale, 0.3, flyP);
  const flyRotate = lerp(0, 15, flyP);
  const flyOpacity = 1 - Math.min(1, Math.max(0, (flyP - 0.5) / 0.5));

  const finalX = progress < 2.8 ? 0 : progress < 7 ? phase3X : flyX;
  const finalY = progress < 7 ? 0 : flyY;
  const finalScale = progress < 2.8 ? phase12Scale : progress < 7 ? phase3Scale : flyScale;
  const finalRotate = progress < 7 ? 0 : flyRotate;
  const cardOpacity = progress < 7 ? 1 : flyOpacity;

  // Check badge & glow appear during selection
  const selectVisuals = selectP;

  const step = progress < 3.2 ? 1 : progress < 7 ? 2 : 3;

  return (
    <div ref={containerRef} style={{ height: mobile ? "420vh" : "300vh" }}>
      <div className="sticky top-0 overflow-hidden flex flex-col items-center justify-center" style={{ height: "100dvh" }}>
        {/* Grid bg */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Step indicator — visible from start */}
        <div
          className="absolute top-24 md:top-20 left-0 right-0 flex justify-center gap-3 md:gap-4 z-30 px-4"
          style={{ opacity: titleOpacity }}
        >
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="rounded-full flex items-center justify-center text-xs md:text-sm font-bold shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: step >= s ? "#333d4b" : "#e5e7eb",
                    color: step >= s ? "#fff" : "#9ca3af",
                  }}
                >
                  {s}
                </div>
                {!mobile && (
                  <span
                    className="text-sm font-semibold whitespace-nowrap"
                    style={{ color: step >= s ? "#333d4b" : "#9ca3af" }}
                  >
                    {s === 1 ? t("step1Label") : s === 2 ? t("step2Label") : t("step3Label")}
                  </span>
                )}
                {s < 3 && (
                  <div className="w-6 md:w-10 h-0.5 bg-slate-200 ml-1 md:ml-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#333d4b] rounded-full"
                      style={{ width: step > s ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Mosaic area */}
        <div className="relative" style={{ width: "100vw", height: "80vh" }}>
          {/* Surrounding cards */}
          {CARDS.map((card, idx) => {
            const isGhost = "ghost" in card;
            const posScale = mobile ? 0.38 : 1;
            return (
              <div
                key={idx}
                className="absolute"
                style={{
                  left: "50%",
                  top: mobile ? "42%" : "50%",
                  marginLeft: -70,
                  marginTop: -88,
                  transform: `translate(${card.x * spreadP * posScale}px, ${card.y * spreadP * posScale}px) scale(${(mobile ? 0.55 : 0.7) + 0.3 * spreadP})`,
                  zIndex: isGhost ? 1 : 5,
                  opacity: surroundOpacity * (isGhost ? 0.5 : 1),
                }}
              >
                <ExchangeCard
                  label={isGhost ? "" : (card as any).label}
                  color={isGhost ? "" : (card as any).color}
                  logo={isGhost ? "" : (card as any).logo}
                  balance={isGhost ? undefined : (card as any).balance}
                  ghost={isGhost}
                  locked={!isGhost}
                />
              </div>
            );
          })}

          {/* === Center Binance card === */}
          <div
            className="absolute z-10"
            style={{
              width: mobile ? 260 : 340,
              height: mobile ? 340 : 440,
              left: "50%",
              top: mobile ? "42%" : "50%",
              marginLeft: mobile ? -130 : -170,
              marginTop: mobile ? -170 : -220,
              transform: `translate(${finalX}px, ${finalY}px) scale(${finalScale}) rotate(${finalRotate}deg)`,
              opacity: cardOpacity,
            }}
          >
            {/* Brand glow */}
            <div
              className="absolute -inset-8 rounded-[44px] blur-3xl"
              style={{ backgroundColor: SELECTED.color + "30", opacity: selectVisuals * cardOpacity }}
            />
            {/* Green connected glow — flashes on click then fades */}
            <div
              className="absolute -inset-4 rounded-[28px] blur-2xl"
              style={{
                backgroundColor: "#22c55e",
                opacity: glowFlash * 0.35 * cardOpacity,
              }}
            />
            <div
              className="relative w-full h-full overflow-hidden shadow-2xl"
              style={{
                borderRadius: lerp(36, 28, Math.max(0, (selectP - 0.42) / 0.43)),
                backgroundColor: SELECTED.color,
                boxShadow: glowFlash > 0
                  ? `0 20px 60px rgba(0,0,0,0.3), 0 0 0 2px rgba(34,197,94,${glowFlash * 0.6}), 0 0 40px rgba(34,197,94,${glowFlash * 0.2})`
                  : `0 20px 60px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Top row — logo left, connected right */}
              <div className="absolute top-3 left-3 right-3 md:top-5 md:left-5 md:right-5 flex items-center justify-between">
                <img src={SELECTED.logo} alt={SELECTED.label} className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl object-cover" />
                <div
                  className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/15 rounded-full"
                  style={{ opacity: connectedP, transform: `scale(${0.5 + 0.5 * connectedP})` }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/80 text-xs md:text-sm font-medium">Connected</span>
                </div>
              </div>

              {/* Asset list — slides in above balance */}
              <div
                className="absolute left-3 right-3 md:left-5 md:right-5"
                style={{
                  top: mobile ? 65 : 100,
                  opacity: assetP * (1 - assetFadeOut),
                }}
              >
                <div className="space-y-2">
                  {ASSETS.map((a) => (
                    <div key={a.coin} className="flex items-center justify-between bg-white/10 rounded-lg md:rounded-xl px-2.5 py-2 md:px-4 md:py-3">
                      <div className="flex items-center gap-1.5 md:gap-2.5">
                        {a.logo && <img src={a.logo} alt={a.coin} className="w-5 h-5 md:w-7 md:h-7 rounded-full object-cover" />}
                        <span className="text-white/80 text-[11px] md:text-[13px] font-semibold">{a.coin}</span>
                      </div>
                      <span className="text-white text-[11px] md:text-[13px] font-bold">{a.krw}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom — same position, content transitions */}
              <div className="absolute bottom-5 left-4 right-4 md:bottom-8 md:left-7 md:right-7">
                {/* "연결하기" fades out in place, balance fades in same spot */}
                <div className="relative">
                  <div
                    className="text-white text-2xl md:text-3xl font-bold"
                    style={{
                      opacity: Math.max(0, 1 - connectedP * 4),
                      transform: `translateY(${Math.min(1, connectedP * 4) * -10}px)`,
                    }}
                  >
                    {t("connect")}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      opacity: connectedP > 0.4 ? 1 : 0,
                    }}
                  >
                    <div className="text-white text-2xl md:text-3xl font-bold leading-tight overflow-hidden flex items-end">
                      {(() => {
                        const BALANCE = "₩ 532,950,000";
                        const DIGIT_H = mobile ? 30 : 38;
                        let digitIdx = 0;
                        return BALANCE.split("").map((char, i) => {
                          const isDigit = /\d/.test(char);
                          if (!isDigit) {
                            const p = Math.min(1, Math.max(0, (connectedP - 0.4) / 0.3));
                            return (
                              <span key={i} className="inline-block" style={{ opacity: p, height: DIGIT_H, lineHeight: `${DIGIT_H}px` }}>
                                {char === " " ? "\u00A0" : char}
                              </span>
                            );
                          }
                          const target = parseInt(char);
                          const idx = digitIdx++;
                          const stagger = idx * 0.025;
                          const localP = Math.min(1, Math.max(0, (connectedP - 0.08 - stagger) / 0.6));
                          const eased = 1 - Math.pow(1 - localP, 3);
                          const spins = 4;
                          const currentY = eased * (spins * 10 + target) * DIGIT_H;
                          return (
                            <span key={i} className="inline-block overflow-hidden" style={{ height: DIGIT_H }}>
                              <div style={{ transform: `translateY(-${currentY}px)` }}>
                                {Array.from({ length: spins * 10 + 10 }, (_, j) => (
                                  <div key={j} style={{ height: DIGIT_H, lineHeight: `${DIGIT_H}px` }}>
                                    {j % 10}
                                  </div>
                                ))}
                              </div>
                            </span>
                          );
                        });
                      })()}
                    </div>
                    <div
                      className="text-white/50 text-sm font-medium mt-1.5"
                      style={{
                        opacity: Math.min(1, Math.max(0, (connectedP - 0.6) / 0.3)),
                      }}
                    >
                      {SELECTED.label}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Phase 2: "자산 확인" text */}
        <div
          className="absolute z-30 px-5"
          style={{
            ...(mobile
              ? { left: 0, right: 0, bottom: "1vh", textAlign: "center" }
              : { right: "calc(50% - 526px)", top: "50%", maxWidth: 600 }),
            transform: mobile
              ? `translateY(${(1 - assetP) * 40}px)`
              : `translateY(calc(-50% + ${(1 - assetP) * 40}px))`,
            opacity: assetP * (1 - assetFadeOut),
          }}
        >
          <div
            style={{
              display: mobile ? "inline-flex" : "none",
              padding: "6px 16px",
              borderRadius: 100,
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
              {t("step2Label")}
            </span>
          </div>
          <h2 className="whitespace-pre-line text-[28px] md:text-[44px]" style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, marginBottom: 16 }}>
            {t("phase2Title")}
          </h2>
          <p className="whitespace-pre-line" style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
            {t("phase2Subtitle")}
          </p>
        </div>

        {/* Phase 3: "전문가 신고" — full center layout */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center md:justify-center pt-28 px-5 pb-[22vh] md:pb-0 overflow-y-auto"
          style={{
            opacity: filingP,
            pointerEvents: filingP > 0.5 ? "auto" : "none",
          }}
        >
          {/* Flying document trail effect — desktop only */}
          {!mobile && (
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                height: 500,
                opacity: filingP * 0.15,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-2xl border-2 border-primary-300"
                  style={{
                    width: 80 + i * 40,
                    height: 100 + i * 50,
                    left: `${50 + (i - 1) * 15}%`,
                    top: `${50 + (i - 1) * 10}%`,
                    transform: `translate(-50%, -50%) rotate(${-10 + i * 10}deg)`,
                    opacity: 0.3 + i * 0.2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Title — desktop: above card, mobile: hidden here (shown at bottom instead) */}
          {!mobile && (
            <div
              className="text-center mb-10"
              style={{ transform: `translateY(${(1 - filingP) * 40}px)` }}
            >
              <h2 className="whitespace-pre-line text-[44px]" style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, marginBottom: 16 }}>
                {t("phase3Title")}
              </h2>
              <p className="whitespace-pre-line" style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
                {t("phase3Subtitle")}
              </p>
            </div>
          )}

          {/* Filing completion card */}
          <div
            className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-slate-200/60 px-4 py-5 md:px-10 md:py-9 w-full max-w-[560px]"
            style={{
              transform: mobile
                ? `translateY(${(1 - filingP) * 40}px)`
                : `translateY(${(1 - filingP) * 60}px) scale(${0.9 + 0.1 * filingP})`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 md:mb-7">
              <div>
                <div className="text-base md:text-xl font-bold text-slate-900">{t("filingTitle")}</div>
                <div className="text-xs md:text-sm text-slate-400 mt-1">{t("filingYear")}</div>
              </div>
              {stepsP > 0.95 ? (
                <div
                  className="px-4 py-2 rounded-full bg-primary-600 flex items-center gap-1.5"
                  style={{
                    transform: `scale(${Math.min(1, (stepsP - 0.95) / 0.05)})`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-white text-sm font-bold">{t("filingDone")}</span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-slate-900">{Math.round(stepsP * 100)}%</div>
              )}
            </div>

            {/* Progress bar */}
            <div className="mb-4 md:mb-7">
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-slate-900"
                  style={{ width: `${stepsP * 100}%` }}
                />
              </div>
            </div>

            {/* Steps — connected vertical line */}
            <div className="relative">
              {/* Continuous vertical line — stops before last item */}
              <div
                className="absolute left-[9px] top-3 w-0.5 bg-slate-200"
                style={{ height: "calc(100% - 40px)" }}
              />
              {/* Filled progress line */}
              <div
                className="absolute left-[9px] top-3 w-0.5 bg-slate-900"
                style={{ height: `${Math.min(stepsP, 0.75) / 0.75 * 100}%`, maxHeight: "calc(100% - 40px)" }}
              />

              <div className="space-y-4 md:space-y-6">
                {[0, 1, 2, 3].map((i) => {
                  const item = { label: t(`filingSteps.${i}.label`), sub: t(`filingSteps.${i}.sub`) };
                  return item;
                }).map((item, i) => {
                  const stepDone = stepsP >= (i + 1) / 4;
                  const stepActive = stepsP >= i / 4 && stepsP < (i + 1) / 4;

                  return (
                    <div key={i} className="flex items-start gap-4 relative">
                      {/* Dot/Check */}
                      <div
                        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center relative z-10 mt-0.5"
                        style={{
                          backgroundColor: stepDone ? "#333d4b" : stepActive ? "#333d4b" : "#fff",
                          border: stepDone || stepActive ? "none" : "2px solid #d1d5db",
                        }}
                      >
                        {stepDone && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 13l4 4L19 7"/>
                          </svg>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[15px] font-semibold"
                          style={{ color: stepDone || stepActive ? "#333d4b" : "#9ca3af" }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="text-[13px] mt-0.5"
                          style={{ color: stepDone || stepActive ? "#4e5968" : "#c4c9d0" }}
                        >
                          {item.sub}
                        </div>
                      </div>

                      {stepDone && (
                        <span className="text-[15px] font-bold text-primary-600 shrink-0 pt-0.5">{t("stepDone")}</span>
                      )}
                      {stepActive && (
                        <span className="text-[13px] font-medium text-slate-400 shrink-0 pt-0.5">{t("stepActive")}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 title — mobile bottom (same position as phase 1/2) */}
        {mobile && (
          <div
            className="absolute bottom-[1vh] left-0 right-0 text-center px-5 z-30"
            style={{
              opacity: filingP,
              transform: `translateY(${(1 - filingP) * 20}px)`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "6px 16px",
                borderRadius: 100,
                backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
                marginBottom: 20,
              }}
            >
              <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
                {t("step3Label")}
              </span>
            </div>
            <h2 className="whitespace-pre-line text-[28px]" style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, marginBottom: 16 }}>
              {t("phase3Title")}
            </h2>
            <p className="whitespace-pre-line" style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
              {t("phase3Subtitle")}
            </p>
          </div>
        )}

        {/* Phase 1 title + subtitle */}
        <div
          className="absolute bottom-[1vh] md:bottom-[5vh] left-0 right-0 text-center px-5 z-30"
          style={{
            opacity: Math.min(1, Math.max(0, (progress - 0.8) / 0.3)) * (1 - fadeOutP),
            transform: `translateY(${(1 - Math.min(1, Math.max(0, (progress - 0.8) / 0.3))) * 20}px)`,
          }}
        >
          <div
            style={{
              display: mobile ? "inline-flex" : "none",
              padding: "6px 16px",
              borderRadius: 100,
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
              {t("step1Label")}
            </span>
          </div>
          <h2 className="whitespace-pre-line text-[28px] md:text-[44px]" style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, marginBottom: 16 }}>
            {t("title")}
          </h2>
          <p className="whitespace-pre-line" style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
            {t("subtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
