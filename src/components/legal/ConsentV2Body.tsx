"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

const TH_CLASS = "border border-slate-300 px-3 py-2 text-left font-semibold bg-slate-50";
const TD_CLASS = "border border-slate-300 px-3 py-2 align-top";

export default function ConsentV2Body({
  namespace = "consent",
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.consent}
      currentVersionKey="v2_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      <p>{t("intro")}</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {[0, 1, 2].map((i) => (
                <th key={i} className={TH_CLASS}>{t(`tableHeaders.${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map((i) => (
              <tr key={i}>
                <td className={TD_CLASS}>{t(`rows.${i}.purpose`)}</td>
                <td className={TD_CLASS}>{t(`rows.${i}.items`)}</td>
                <td className={TD_CLASS}>{t(`rows.${i}.retention`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LegalPageLayout>
  );
}
