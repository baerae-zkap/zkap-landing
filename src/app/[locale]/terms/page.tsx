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

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.terms}
      currentVersionKey="v1_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      {/* 제1조 목적 */}
      <h2>{t("article1.title")}</h2>
      <p>{t("article1.content")}</p>

      {/* 제2조 정의 */}
      <h2>{t("article2.title")}</h2>
      <p>{t("article2.intro")}</p>
      <ol>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`article2.items.${i}`)}</li>
        ))}
      </ol>

      {/* 제3조 약관의 게시와 개정 */}
      <h2>{t("article3.title")}</h2>
      {[0, 1, 2, 3, 4].map((i) => (
        <Clause key={i} num={"①②③④⑤"[i]}>
          {t(`article3.items.${i}`)}
        </Clause>
      ))}

      {/* 제4조 약관의 해석 */}
      <h2>{t("article4.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article4.items.${i}`)}
        </Clause>
      ))}

      {/* 제5조 이용계약 체결 */}
      <h2>{t("article5.title")}</h2>
      <Clause num="①">{t("article5.items.0")}</Clause>
      <Clause num="②">{t("article5.items.1")}</Clause>
      <ol>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <li key={i}>{t(`article5.rejectionReasons.${i}`)}</li>
        ))}
      </ol>
      <Clause num="③">{t("article5.conclusion")}</Clause>

      {/* 제6조 회원의 의무 */}
      <h2>{t("article6.title")}</h2>
      <Clause num="①">{t("article6.intro")}</Clause>
      <Clause num="②">{t("article6.subIntro")}</Clause>
      <ol>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`article6.items.${i}`)}</li>
        ))}
      </ol>

      {/* 제7조 회원에 대한 통지 */}
      <h2>{t("article7.title")}</h2>
      {[0, 1, 2].map((i) => (
        <Clause key={i} num={"①②③"[i]}>
          {t(`article7.items.${i}`)}
        </Clause>
      ))}

      {/* 제8조 이용 제한 등 */}
      <h2>{t("article8.title")}</h2>
      <Clause num="①">{t("article8.items.0")}</Clause>
      <ol>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`article8.reasons.${i}`)}</li>
        ))}
      </ol>
      {[0, 1, 2].map((i) => (
        <Clause key={i} num={"②③④"[i]}>
          {t(`article8.procedures.${i}`)}
        </Clause>
      ))}

      {/* 제9조 서비스 변경 및 중단 */}
      <h2>{t("article9.title")}</h2>
      <Clause num="①">{t("article9.intro")}</Clause>
      <ol>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`article9.reasons.${i}`)}</li>
        ))}
      </ol>
      <Clause num="②">{t("article9.notice")}</Clause>

      {/* 제10조 지식재산권 */}
      <h2>{t("article10.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article10.items.${i}`)}
        </Clause>
      ))}

      {/* 제11조 개인정보 보호 */}
      <h2>{t("article11.title")}</h2>
      <p>{t("article11.content")}</p>

      {/* 제12조 면책 */}
      <h2>{t("article12.title")}</h2>
      {[0, 1, 2, 3].map((i) => (
        <Clause key={i} num={"①②③④"[i]}>
          {t(`article12.items.${i}`)}
        </Clause>
      ))}

      {/* 제13조 준거법 및 재판관할 */}
      <h2>{t("article13.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article13.items.${i}`)}
        </Clause>
      ))}

      {/* 부칙 */}
      <h2>부칙</h2>
      <p>{t("addendum")}</p>
    </LegalPageLayout>
  );
}
