"use client";

import { useLocale } from "next-intl";
import PrivacyV1Body from "@/components/legal/PrivacyV1Body";
import PrivacyV21Body from "@/components/legal/PrivacyV21Body";

export default function PrivacyV21Page() {
  const locale = useLocale();
  if (locale === "ko") return <PrivacyV21Body namespace="privacy_v2_1" />;
  return <PrivacyV1Body namespace="privacy" />;
}
