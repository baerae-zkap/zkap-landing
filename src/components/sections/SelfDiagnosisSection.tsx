"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const CARD_CONFIGS = [
  {
    bg: "#f2f4f6",
    image: "/images/diagnosis/card-1.png",
    titleColor: "rgba(2,9,19,0.91)",
    descColor: "rgba(3,18,40,0.7)",
  },
  {
    bg: "#000000",
    image: "/images/diagnosis/card-2.png",
    titleColor: "#ffffff",
    descColor: "#ffffff",
  },
  {
    bg: "#4574e2",
    image: "/images/diagnosis/card-3.png",
    titleColor: "#ffffff",
    descColor: "#ffffff",
  },
  {
    bg: "#f9fafb",
    image: "/images/diagnosis/card-4.png",
    titleColor: "rgba(2,9,19,0.91)",
    descColor: "rgba(3,18,40,0.7)",
  },
  {
    bg: "#000000",
    image: "/images/diagnosis/card-5.png",
    titleColor: "#ffffff",
    descColor: "#ffffff",
  },
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
    <section style={{ padding: "160px 24px" }}>
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
            }}
          >
            {t("conclusion")}
          </p>
        </ScrollReveal>

        <div
          ref={containerRef}
          className="scrollbar-hide"
          style={{
            display: "flex",
            padding: "40px 0",
            flexDirection: "row",
            gap: 20,
            overflowX: "auto",
            maxWidth: "100vw",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((item: DiagnosisItem, i: number) => {
            const config = CARD_CONFIGS[i];

            return (
              <motion.div
                key={i}
                style={{
                  backgroundColor: config.bg,
                  borderRadius: 30,
                  width: 320,
                  minWidth: 320,
                  flexShrink: 0,
                  overflow: "hidden",
                  scrollSnapAlign: "start",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Image area */}
                <div
                  style={{
                    width: 320,
                    height: 295,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <motion.img
                    src={config.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    initial={{ scale: 1.1 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                  />
                </div>

                {/* Text area */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      margin: "36px 30px 16px 30px",
                      fontWeight: "bold",
                      color: config.titleColor,
                      lineHeight: 1.6,
                      fontSize: 24,
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      margin: "0 30px 48px 30px",
                      fontWeight: 500,
                      color: config.descColor,
                      lineHeight: 1.6,
                      fontSize: 17,
                    }}
                  >
                    {item.description}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
