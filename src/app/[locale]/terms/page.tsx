"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown } from "lucide-react";

const VERSIONS = [
  { key: "v1_0", label: "v1.0 (2026.03.16)" },
] as const;

type VersionKey = (typeof VERSIONS)[number]["key"];

export default function TermsPage() {
  const t = useTranslations("terms");
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
            <p>{t("agreement")}</p>

            <h2>{t("article1.title")}</h2>
            <p>{t("article1.content")}</p>

            <h2>{t("article2.title")}</h2>
            <p>{t("article2.intro")}</p>
            <ul>
              <li>{t("article2.items.0")}</li>
              <li>{t("article2.items.1")}</li>
              <li>{t("article2.items.2")}</li>
              <li>{t("article2.items.3")}</li>
              <li>{t("article2.items.4")}</li>
            </ul>
            <p>{t("article2.disclaimer1")}</p>
            <p>{t("article2.disclaimer2")}</p>
            <p>{t("article2.disclaimer3")}</p>

            <h2>{t("article3.title")}</h2>
            <p>{t("article3.intro")}</p>
            <ul>
              <li>{t("article3.methods.0")}</li>
              <li>{t("article3.methods.1")}</li>
              <li>{t("article3.methods.2")}</li>
            </ul>
            <p>{t("article3.notice")}</p>

            <h2>{t("article4.title")}</h2>
            <p>{t("article4.intro")}</p>
            <p>{t("article4.consent")}</p>
            <ul>
              <li>{t("article4.items.0")}</li>
              <li>{t("article4.items.1")}</li>
              <li>{t("article4.items.2")}</li>
            </ul>
            <p>{t("article4.purpose")}</p>

            <h2>{t("article5.title")}</h2>
            <p>{t("article5.content1")}</p>
            <p>{t("article5.content2")}</p>
            <p>{t("article5.content3")}</p>
            <ul>
              <li>{t("article5.items.0")}</li>
              <li>{t("article5.items.1")}</li>
              <li>{t("article5.items.2")}</li>
              <li>{t("article5.items.3")}</li>
            </ul>

            <h2>{t("article6.title")}</h2>
            <p>{t("article6.intro")}</p>
            <ul>
              <li>{t("article6.items.0")}</li>
              <li>{t("article6.items.1")}</li>
              <li>{t("article6.items.2")}</li>
            </ul>

            <h2>{t("article7.title")}</h2>
            <p>{t("article7.content")}</p>

            <h2>{t("article8.title")}</h2>
            <p>{t("article8.intro")}</p>
            <ul>
              <li>{t("article8.items.0")}</li>
              <li>{t("article8.items.1")}</li>
              <li>{t("article8.items.2")}</li>
              <li>{t("article8.items.3")}</li>
            </ul>

            <h2>{t("article9.title")}</h2>
            <p>{t("article9.content")}</p>
          </article>
        )}
      </main>
    </div>
  );
}
