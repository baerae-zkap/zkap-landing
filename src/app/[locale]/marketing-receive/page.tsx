"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

export default function MarketingReceivePage() {
  const t = useTranslations("marketingReceive");

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS["marketing-receive"]}
      currentVersionKey="v1_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>
      <p>{t("content")}</p>
    </LegalPageLayout>
  );
}
