"use client";

import { useLocale } from "next-intl";
import PrivacyV1Body from "@/components/legal/PrivacyV1Body";
import PrivacyV2Body from "@/components/legal/PrivacyV2Body";

export default function PrivacyV2Page() {
  const locale = useLocale();
  if (locale === "ko") return <PrivacyV2Body namespace="privacy_v2" />;
  return <PrivacyV1Body namespace="privacy" />;
}
