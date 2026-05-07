"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

function Clause({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="inline-block w-6 text-slate-400 font-medium select-none">
        {num}
      </span>{" "}
      {children}
    </p>
  );
}

export default function TermsV2Body({
  namespace = "terms",
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.terms}
      currentVersionKey="v2_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      <h2>{t("article1.title")}</h2>
      <p>{t("article1.content")}</p>

      <h2>{t("article2.title")}</h2>
      <p>{t("article2.intro")}</p>
      <ol>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`article2.items.${i}`)}</li>
        ))}
      </ol>

      <h2>{t("article3.title")}</h2>
      {[0, 1, 2, 3, 4].map((i) => (
        <Clause key={i} num={"①②③④⑤"[i]}>
          {t(`article3.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article4.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article4.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article5.title")}</h2>
      <Clause num="①">{t("article5.items.0")}</Clause>
      <Clause num="②">{t("article5.items.1")}</Clause>
      <ol>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <li key={i}>{t(`article5.rejectionReasons.${i}`)}</li>
        ))}
      </ol>
      <Clause num="③">{t("article5.conclusion")}</Clause>

      <h2>{t("article6.title")}</h2>
      <Clause num="①">{t("article6.intro")}</Clause>
      <Clause num="②">{t("article6.duty2")}</Clause>
      <Clause num="③">{t("article6.subIntro")}</Clause>
      <ol>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`article6.items.${i}`)}</li>
        ))}
      </ol>

      <h2>{t("article7.title")}</h2>
      {[0, 1, 2].map((i) => (
        <Clause key={i} num={"①②③"[i]}>
          {t(`article7.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article8.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article8.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article9.title")}</h2>
      <Clause num="①">{t("article9.items.0")}</Clause>
      <ol>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`article9.reasons.${i}`)}</li>
        ))}
      </ol>
      {[0, 1, 2].map((i) => (
        <Clause key={i} num={"②③④"[i]}>
          {t(`article9.procedures.${i}`)}
        </Clause>
      ))}

      <h2>{t("article10.title")}</h2>
      <Clause num="①">{t("article10.intro")}</Clause>
      <ol>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`article10.reasons.${i}`)}</li>
        ))}
      </ol>
      <Clause num="②">{t("article10.notice")}</Clause>

      <h2>{t("article11.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article11.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article12.title")}</h2>
      <p>{t("article12.content")}</p>

      <h2>{t("article13.title")}</h2>
      {[0, 1, 2, 3].map((i) => (
        <Clause key={i} num={"①②③④"[i]}>
          {t(`article13.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article14.title")}</h2>
      {[0, 1, 2, 3].map((i) => (
        <Clause key={i} num={"①②③④"[i]}>
          {t(`article14.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article15.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article15.items.${i}`)}
        </Clause>
      ))}

      <h2>부칙</h2>
      <p>{t("addendum")}</p>
    </LegalPageLayout>
  );
}
