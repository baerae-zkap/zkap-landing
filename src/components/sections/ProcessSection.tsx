"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

/* Placeholder app screens — replace images later */
function MockScreen({ step }: { step: number }) {
  const screens = [
    // Step 1: Exchange connection
    <div key={0} className="w-full h-full bg-white rounded-2xl p-5 flex flex-col">
      <div className="text-xs text-slate-400 mb-3">거래소 연결</div>
      <div className="text-sm font-bold text-slate-900 mb-4">연결할 거래소를 선택하세요</div>
      <div className="space-y-2.5 flex-1">
        {["Binance", "Bybit", "OKX", "Coinbase"].map((name) => (
          <div key={name} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
            <div className="w-8 h-8 bg-slate-200 rounded-lg" />
            <span className="text-sm font-medium text-slate-700">{name}</span>
            <div className="ml-auto w-5 h-5 border-2 border-primary-500 rounded-full" />
          </div>
        ))}
      </div>
      <div className="bg-primary-600 text-white text-center py-3 rounded-xl text-sm font-semibold mt-4">
        연결하기
      </div>
    </div>,
    // Step 2: Asset review
    <div key={1} className="w-full h-full bg-white rounded-2xl p-5 flex flex-col">
      <div className="text-xs text-slate-400 mb-1">총 해외 자산</div>
      <div className="text-2xl font-bold text-slate-900 mb-4">₩ 823,450,000</div>
      <div className="text-xs text-slate-400 mb-2">2025년 12월 말 기준</div>
      <div className="space-y-2 flex-1">
        {[
          { name: "Binance", amount: "₩ 352,100,000" },
          { name: "Bybit", amount: "₩ 241,350,000" },
          { name: "OKX", amount: "₩ 158,000,000" },
          { name: "Coinbase", amount: "₩ 72,000,000" },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded-md" />
              <span className="text-xs font-medium text-slate-600">{item.name}</span>
            </div>
            <span className="text-xs font-semibold text-slate-900">{item.amount}</span>
          </div>
        ))}
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mt-3">
        <span className="text-xs text-red-600 font-medium">5억 초과 — 신고 대상입니다</span>
      </div>
    </div>,
    // Step 3: Expert filing
    <div key={2} className="w-full h-full bg-white rounded-2xl p-5 flex flex-col">
      <div className="text-xs text-slate-400 mb-3">세무사 매칭</div>
      <div className="text-sm font-bold text-slate-900 mb-4">담당 세무사가 배정되었습니다</div>
      <div className="bg-slate-50 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">세</div>
          <div>
            <div className="text-sm font-bold text-slate-900">김세무 세무사</div>
            <div className="text-xs text-slate-500">가상자산 전문</div>
          </div>
        </div>
        <div className="text-xs text-slate-500">자산 내역을 확인하고 있어요.</div>
      </div>
      <div className="space-y-2 flex-1">
        {["거래소 연동 완료", "자산 내역 확인 완료"].map((text) => (
          <div key={text} className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px]">✓</span>
            </div>
            <span className="text-xs text-slate-600">{text}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary-200 rounded-full" />
          <span className="text-xs text-slate-900 font-medium">신고서 작성 중...</span>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="w-full h-full relative">
      {screens.map((screen, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: step === i ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {screen}
        </motion.div>
      ))}
    </div>
  );
}

export default function ProcessSection() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Step 1: 0~0.2, Step 2: 0.2~0.3, Step 3: 0.3~1.0 (긴 유지)
    const step = v < 0.2 ? 0 : v < 0.3 ? 1 : 2;
    setCurrentStep(step);
  });

  const stepDetails = [
    "Binance, Bybit, OKX, Coinbase 로그인 한 번이면 연동 완료. 복잡한 API 키 입력 없이, 거래소 계정을 바로 연결할 수 있어요.",
    "연동된 거래소의 작년 월말 잔고를 자동으로 조회하고, 원화로 환산한 총 자산을 한눈에 확인할 수 있어요.",
    "수집된 자산 데이터를 가상자산 전문 세무사에게 전달하고, 세무사가 직접 신고서를 작성해 신고를 완료해요.",
  ];

  return (
    <div ref={containerRef} style={{ height: "450vh" }}>
      <div className="sticky top-0 flex items-center overflow-hidden" style={{ height: "100dvh", padding: "0 24px" }}>
        <div className="max-w-[1100px] mx-auto w-full flex items-center gap-20 max-lg:flex-col max-lg:gap-8 max-lg:justify-center">
          {/* Phone mockup — left */}
          <div className="shrink-0">
            <div className="w-[280px] h-[560px] bg-slate-900 rounded-[40px] p-3 shadow-2xl max-lg:w-[220px] max-lg:h-[440px]">
              <div className="w-full h-full rounded-[32px] overflow-hidden bg-slate-100">
                <MockScreen step={currentStep} />
              </div>
            </div>
          </div>

          {/* Step text — right */}
          <div className="flex-1 max-w-[460px] max-lg:text-center">
            <div
              style={{
                display: "inline-flex",
                padding: "6px 16px",
                borderRadius: 100,
                backgroundColor: "#f2f4f6",
                marginBottom: 20,
              }}
            >
              <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 17 }}>
                간편한 신고
              </span>
            </div>

            {/* Step content — crossfade */}
            <div className="relative" style={{ minHeight: 220 }}>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{
                    opacity: currentStep === i ? 1 : 0,
                    y: currentStep === i ? 0 : 20,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {step.number}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#4e5968" }}>
                      Step {step.number}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontWeight: "bold",
                      color: "#333d4b",
                      lineHeight: 1.3,
                      fontSize: 36,
                      marginBottom: 20,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontWeight: 600, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
                    {stepDetails[i]}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Step indicators */}
            <div className="flex gap-2 mt-8 max-lg:justify-center">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentStep === i ? "w-8 bg-primary-600" : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
