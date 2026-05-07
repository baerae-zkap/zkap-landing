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

const TH_CLASS = "border border-slate-300 px-3 py-2 text-left font-semibold bg-slate-50";
const TD_CLASS = "border border-slate-300 px-3 py-2 align-top";

export default function PrivacyV2Body({
  namespace = "privacy",
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.privacy}
      currentVersionKey="v2_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      <h2>{t("article1.title")}</h2>
      <Clause num="①">{t("article1.intro1")}</Clause>
      <Clause num="②">{t("article1.intro2")}</Clause>
      <Clause num="③">{t("article1.intro3")}</Clause>

      <p className="font-semibold text-slate-700 mt-6 mb-2">{t("article1.tableCaption")}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {[0, 1, 2, 3].map((i) => (
                <th key={i} className={TH_CLASS}>{t(`article1.tableHeaders.${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3].map((i) => (
              <tr key={i}>
                <td className={`${TD_CLASS} font-medium whitespace-nowrap`}>{t(`article1.rows.${i}.type`)}</td>
                <td className={TD_CLASS}>{t(`article1.rows.${i}.purpose`)}</td>
                <td className={TD_CLASS}>{t(`article1.rows.${i}.items`)}</td>
                <td className={TD_CLASS}>{t(`article1.rows.${i}.retention`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-8">{t("article1.methodsTitle")}</h3>
      <p>{t("article1.methodsIntro")}</p>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`article1.methods.${i}`)}</li>
        ))}
      </ul>
      <Clause num="④">{t("article1.deviceNotice")}</Clause>

      <h2>{t("article2.title")}</h2>
      <p>{t("article2.intro")}</p>
      <ol>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`article2.items.${i}`)}</li>
        ))}
      </ol>

      <h2>{t("article3.title")}</h2>
      <Clause num="①">{t("article3.delegationIntro")}</Clause>
      <div className="overflow-x-auto my-3">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {[0, 1].map((i) => (
                <th key={i} className={TH_CLASS}>{t(`article3.delegationHeaders.${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${TD_CLASS} font-medium whitespace-nowrap`}>{t("article3.delegationRows.0.company")}</td>
              <td className={TD_CLASS}>{t("article3.delegationRows.0.scope")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Clause num="②">{t("article3.overseasIntro")}</Clause>
      <ul>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <li key={i}>{t(`article3.overseas.${i}`)}</li>
        ))}
      </ul>
      <Clause num="③">{t("article3.supervision")}</Clause>
      <Clause num="④">{t("article3.change")}</Clause>

      <h2>{t("article4.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article4.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article5.title")}</h2>
      {[0, 1, 2, 3].map((i) => (
        <Clause key={i} num={"①②③④"[i]}>
          {t(`article5.items.${i}`)}
        </Clause>
      ))}

      <h2>{t("article6.title")}</h2>
      <Clause num="①">{t("article6.intro")}</Clause>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <span className="font-medium">{t(`article6.measures.${i}.label`)}: </span>
            {t(`article6.measures.${i}.content`)}
          </li>
        ))}
      </ul>
      <Clause num="②">{t("article6.additional")}</Clause>

      <h2>{t("article7.title")}</h2>
      <p>{t("article7.intro")}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <span className="font-medium">{t(`article7.browsers.${i}.label`)}: </span>
            {t(`article7.browsers.${i}.path`)}
          </li>
        ))}
      </ul>

      <h2>{t("article8.title")}</h2>
      <Clause num="①">{t("article8.items.0")}</Clause>
      <Clause num="②">{t("article8.items.1")}</Clause>
      <div className="overflow-x-auto my-3">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {[0, 1, 2, 3].map((i) => (
                <th key={i} className={TH_CLASS}>{t(`article8.tableHeaders.${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={TD_CLASS}>{t("article8.tableRow.items")}</td>
              <td className={TD_CLASS}>{t("article8.tableRow.method")}</td>
              <td className={TD_CLASS}>{t("article8.tableRow.purpose")}</td>
              <td className={TD_CLASS}>{t("article8.tableRow.retention")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Clause num="③">{t("article8.adIntro")}</Clause>
      <ul>
        {[0, 1].map((i) => (
          <li key={i}>
            <span className="font-medium">{t(`article8.adGuides.${i}.label`)}: </span>
            {t(`article8.adGuides.${i}.path`)}
          </li>
        ))}
      </ul>
      <p className="text-slate-500 text-sm">{t("article8.adNote")}</p>

      <h2>{t("article9.title")}</h2>
      <Clause num="①">{t("article9.intro")}</Clause>
      <div className="my-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 space-y-1 not-prose">
        <div><span className="text-slate-400 w-14 inline-block">성명</span>{t("article9.officer.name")}</div>
        <div><span className="text-slate-400 w-14 inline-block">직책</span>{t("article9.officer.title")}</div>
        <div><span className="text-slate-400 w-14 inline-block">연락처</span>{t("article9.officer.contact")}</div>
      </div>
      <Clause num="②">{t("article9.notice")}</Clause>

      <h2>{t("article10.title")}</h2>
      <Clause num="①">{t("article10.intro")}</Clause>
      <div className="overflow-x-auto my-3">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {[0, 1, 2, 3].map((i) => (
                <th key={i} className={TH_CLASS}>{t(`article10.internalHeaders.${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={TD_CLASS}>{t("article10.internalRow.category")}</td>
              <td className={TD_CLASS}>{t("article10.internalRow.department")}</td>
              <td className={TD_CLASS}>{t("article10.internalRow.phone")}</td>
              <td className={TD_CLASS}>{t("article10.internalRow.email")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Clause num="②">{t("article10.agenciesIntro")}</Clause>
      <div className="space-y-3 not-prose text-sm">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-slate-50 p-4">
            <p className="font-medium text-slate-800 mb-1">
              {t(`article10.agencies.${i}.name`)}
            </p>
            <p className="text-slate-500">
              홈페이지: {t(`article10.agencies.${i}.website`)} &middot; 전화: {t(`article10.agencies.${i}.phone`)}
            </p>
          </div>
        ))}
      </div>

      <h2>{t("article11.title")}</h2>
      <p>{t("article11.content")}</p>

      <h2>부칙</h2>
      <p>{t("addendum")}</p>
    </LegalPageLayout>
  );
}
