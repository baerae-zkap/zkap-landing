"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const EXCHANGE_LOGOS = [
  { src: "/images/exchanges/Binance.svg", name: "Binance" },
  { src: "/images/exchanges/Bybit.svg", name: "Bybit" },
  { src: "/images/exchanges/OKX.svg", name: "OKX" },
  { src: "/images/exchanges/Coinbase.svg", name: "Coinbase" },
];

function FeatureRow({
  badge,
  title,
  description,
  imageContent,
  reverse = false,
  delay = 0,
}: {
  badge: string;
  title: string;
  description: string;
  imageContent: React.ReactNode;
  reverse?: boolean;
  delay?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: reverse ? "row-reverse" : "row",
        gap: 130,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="max-lg:!flex-col max-lg:!gap-10 max-lg:!text-center"
    >
      <ScrollReveal delay={delay}>
        <div style={{ width: 420, height: 420 }} className="max-lg:!w-[300px] max-lg:!h-[300px] flex items-center justify-center">
          {imageContent}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={delay + 0.1}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: 460,
          }}
          className="max-lg:!w-full max-lg:!items-center"
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 100,
              backgroundColor: "#f2f4f6",
            }}
            className="max-lg:!self-center"
          >
            <span
              style={{
                fontWeight: "bold",
                color: "rgba(0,12,30,0.8)",
                lineHeight: 1.6,
                fontSize: 17,
              }}
            >
              {badge}
            </span>
          </div>
          <span
            style={{
              fontWeight: "bold",
              color: "#333d4b",
              lineHeight: 1.3,
              fontSize: 36,
            }}
            className="whitespace-pre-line"
          >
            {title}
          </span>
          <span
            style={{
              fontWeight: 600,
              color: "#4e5968",
              lineHeight: 1.6,
              fontSize: 15,
            }}
          >
            {description}
          </span>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function ExchangeAssetSection() {
  const t = useTranslations("exchange");

  return (
    <section style={{ padding: "160px 24px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Feature 1: Exchange Integration */}
        <FeatureRow
          badge="거래소 연동"
          title={t("title")}
          description={t("subtitle")}
          imageContent={
            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-2 gap-3">
                {EXCHANGE_LOGOS.map((logo) => (
                  <div
                    key={logo.name}
                    className="bg-white rounded-2xl border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-center"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={40}
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <div style={{ height: 140 }} />

        {/* Feature 2: Asset Overview */}
        <FeatureRow
          badge="자산 조회"
          title={"내 해외 자산을\n한눈에 확인"}
          description="연동된 거래소별 보유 자산, 월말 잔고, 원화 환산 금액까지 한 화면에서 확인할 수 있어요"
          reverse
          delay={0.05}
          imageContent={
            <div className="bg-slate-50 rounded-3xl p-8 w-full h-full flex flex-col justify-center">
              <div className="text-sm text-slate-400 mb-2">총 해외 자산</div>
              <div className="text-3xl font-bold text-slate-900 mb-6">
                ₩ 823,450,000
              </div>
              <div className="space-y-3">
                {["Binance", "Bybit", "OKX", "Coinbase"].map((name, i) => (
                  <div
                    key={name}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {name}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      ₩ {(200000000 + i * 50000000).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          }
        />

      </div>
    </section>
  );
}
