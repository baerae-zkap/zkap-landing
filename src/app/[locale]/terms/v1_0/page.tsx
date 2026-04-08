"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

export default function TermsV1Page() {
  const t = useTranslations("terms_v1_0");

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.terms}
      currentVersionKey="v1_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      <p>{t("intro")}</p>
      <p>{t("agreement")}</p>

      <h2>{t("article1.title")}</h2>
      <p>{t("article1.content")}</p>

      <h2>{t("article2.title")}</h2>
      <p>{t("article2.intro")}</p>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`article2.items.${i}`)}</li>
        ))}
      </ul>
      <p>{t("article2.disclaimer1")}</p>
      <p>{t("article2.disclaimer2")}</p>
      <p>{t("article2.disclaimer3")}</p>

      <h2>{t("article3.title")}</h2>
      <p>{t("article3.intro")}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`article3.methods.${i}`)}</li>
        ))}
      </ul>
      <p>{t("article3.notice")}</p>

      <h2>{t("article4.title")}</h2>
      <p>{t("article4.intro")}</p>
      <p>{t("article4.consent")}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`article4.items.${i}`)}</li>
        ))}
      </ul>
      <p>{t("article4.purpose")}</p>

      <h2>{t("article5.title")}</h2>
      <p>{t("article5.content1")}</p>
      <p>{t("article5.content2")}</p>
      <p>{t("article5.content3")}</p>
      <ul>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`article5.items.${i}`)}</li>
        ))}
      </ul>

      <h2>{t("article6.title")}</h2>
      <p>{t("article6.intro")}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`article6.items.${i}`)}</li>
        ))}
      </ul>

      <h2>{t("article7.title")}</h2>
      <p>{t("article7.content")}</p>

      <h2>{t("article8.title")}</h2>
      <p>{t("article8.intro")}</p>
      <ul>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`article8.items.${i}`)}</li>
        ))}
      </ul>

      <h2>{t("article9.title")}</h2>
      <p>{t("article9.content")}</p>
    </LegalPageLayout>
  );
}
