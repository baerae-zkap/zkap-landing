"use client";

import { useLocale } from "next-intl";
import TermsV1Body from "@/components/legal/TermsV1Body";
import TermsV2Body from "@/components/legal/TermsV2Body";

export default function TermsPage() {
  const locale = useLocale();
  if (locale === "ko") return <TermsV2Body namespace="terms" />;
  return <TermsV1Body namespace="terms" />;
}
