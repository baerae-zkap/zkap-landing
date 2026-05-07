"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

export default function MarketingConsentV1Body({
  namespace,
  currentVersionKey = "v1_0",
}: {
  namespace: string;
  currentVersionKey?: string;
}) {
  const t = useTranslations(namespace);

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS["marketing-consent"]}
      currentVersionKey={currentVersionKey}
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      <p>{t("intro")}</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-4 py-3 text-left font-semibold w-1/4">
                구분
              </th>
              <th className="border border-slate-300 px-4 py-3 text-left font-semibold">
                내용
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-3 align-top font-medium">
                {t("table.purpose.label")}
              </td>
              <td className="border border-slate-300 px-4 py-3">
                {t("table.purpose.content")}
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-3 align-top font-medium">
                {t("table.collected.label")}
              </td>
              <td className="border border-slate-300 px-4 py-3">
                {t("table.collected.content")}
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-3 align-top font-medium">
                {t("table.retention.label")}
              </td>
              <td className="border border-slate-300 px-4 py-3">
                {t("table.retention.content")}
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-3 align-top font-medium">
                {t("table.refusal.label")}
              </td>
              <td className="border border-slate-300 px-4 py-3">
                {t("table.refusal.content")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </LegalPageLayout>
  );
}
