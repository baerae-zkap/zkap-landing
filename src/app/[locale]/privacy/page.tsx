"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown } from "lucide-react";

const VERSIONS = [
  { key: "v1_0", label: "v1.0 (2026.03.16)" },
] as const;

type VersionKey = (typeof VERSIONS)[number]["key"];

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const [version, setVersion] = useState<VersionKey>("v1_0");
  const [open, setOpen] = useState(false);

  const current = VERSIONS.find((v) => v.key === version)!;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-3">
          <Link href="/" className="text-slate-500 hover:text-slate-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">{t("title")}</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Version dropdown */}
        <div className="relative mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {current.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="absolute top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[200px]">
              {VERSIONS.map((v) => (
                <button
                  key={v.key}
                  onClick={() => { setVersion(v.key); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                    v.key === version ? "text-blue-600 font-medium" : "text-slate-700"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {version === "v1_0" && (
          <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
            <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

            <p>{t("intro")}</p>

            {/* 1. 수집하는 개인정보 */}
            <h2>{t("section1.title")}</h2>
            <h3>{t("section1.requiredTitle")}</h3>
            <ul>
              <li>{t("section1.required.0")}</li>
              <li>{t("section1.required.1")}</li>
              <li>{t("section1.required.2")}</li>
              <li>{t("section1.required.3")}</li>
            </ul>
            <h3>{t("section1.optionalTitle")}</h3>
            <ul>
              <li>{t("section1.optional.0")}</li>
            </ul>

            {/* 2. 금융 데이터 수집 */}
            <h2>{t("section2.title")}</h2>
            <p>{t("section2.intro")}</p>
            <ul>
              <li>{t("section2.items.0")}</li>
              <li>{t("section2.items.1")}</li>
              <li>{t("section2.items.2")}</li>
            </ul>
            <p>{t("section2.consent")}</p>

            {/* 3. 개인정보 이용 목적 */}
            <h2>{t("section3.title")}</h2>
            <ul>
              <li>{t("section3.items.0")}</li>
              <li>{t("section3.items.1")}</li>
              <li>{t("section3.items.2")}</li>
              <li>{t("section3.items.3")}</li>
              <li>{t("section3.items.4")}</li>
            </ul>

            {/* 4. 개인정보 보유 기간 */}
            <h2>{t("section4.title")}</h2>
            <p>{t("section4.intro")}</p>
            <ul>
              <li>{t("section4.items.0")}</li>
              <li>{t("section4.items.1")}</li>
              <li>{t("section4.items.2")}</li>
            </ul>

            {/* 5. 개인정보 수집 및 이용 동의 */}
            <h2>{t("section5.title")}</h2>
            <h3>{t("section5.collectTitle")}</h3>
            <ul>
              <li>{t("section5.collectItems.0")}</li>
              <li>{t("section5.collectItems.1")}</li>
              <li>{t("section5.collectItems.2")}</li>
              <li>{t("section5.collectItems.3")}</li>
            </ul>
            <h3>{t("section5.purposeTitle")}</h3>
            <ul>
              <li>{t("section5.purposeItems.0")}</li>
              <li>{t("section5.purposeItems.1")}</li>
              <li>{t("section5.purposeItems.2")}</li>
            </ul>
            <h3>{t("section5.retentionTitle")}</h3>
            <p>{t("section5.retention")}</p>
            <p>{t("section5.refusal")}</p>

            {/* 6. 마케팅 정보 수신 동의 */}
            <h2>{t("section6.title")}</h2>
            <p>{t("section6.intro")}</p>
            <ul>
              <li>{t("section6.purposes.0")}</li>
              <li>{t("section6.purposes.1")}</li>
              <li>{t("section6.purposes.2")}</li>
              <li>{t("section6.purposes.3")}</li>
            </ul>
            <h3>{t("section6.collectTitle")}</h3>
            <ul>
              <li>{t("section6.collectItems.0")}</li>
              <li>{t("section6.collectItems.1")}</li>
            </ul>
            <h3>{t("section6.retentionTitle")}</h3>
            <p>{t("section6.retention")}</p>
            <p>{t("section6.optOut")}</p>

            {/* 7. 계정 연동 및 금융 데이터 접근 동의 */}
            <h2>{t("section7.title")}</h2>
            <p>{t("section7.intro")}</p>
            <p>{t("section7.consent")}</p>
            <ul>
              <li>{t("section7.items.0")}</li>
              <li>{t("section7.items.1")}</li>
              <li>{t("section7.items.2")}</li>
            </ul>
            <p>{t("section7.purpose")}</p>
            <p>{t("section7.disconnect")}</p>
          </article>
        )}
      </main>
    </div>
  );
}
