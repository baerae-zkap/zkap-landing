"use client";

import { useLocale } from "next-intl";
import PrivacyV1Body from "@/components/legal/PrivacyV1Body";
import PrivacyV22Body from "@/components/legal/PrivacyV22Body";

export default function PrivacyPage() {
  const locale = useLocale();
  if (locale === "ko") return <PrivacyV22Body namespace="privacy" />;
  return <PrivacyV1Body namespace="privacy" />;
}
