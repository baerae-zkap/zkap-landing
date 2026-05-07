"use client";

import { useLocale } from "next-intl";
import ConsentV1Body from "@/components/legal/ConsentV1Body";
import ConsentV2Body from "@/components/legal/ConsentV2Body";

export default function ConsentPage() {
  const locale = useLocale();
  if (locale === "ko") return <ConsentV2Body namespace="consent" />;
  return <ConsentV1Body namespace="consent" />;
}
