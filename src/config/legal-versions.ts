export type LegalDocType = "terms" | "privacy" | "consent" | "marketing-consent";

export interface LegalVersion {
  key: string;
  label: string;
  translationNamespace: string;
  path: string; // relative path from locale root, e.g. "/terms" or "/terms/v1_0"
}

export interface LegalDocConfig {
  type: LegalDocType;
  versions: LegalVersion[];
}

export const LEGAL_DOCS: Record<LegalDocType, LegalDocConfig> = {
  terms: {
    type: "terms",
    versions: [
      {
        key: "v2_0",
        label: "v2.0 (2026.04.10)",
        translationNamespace: "terms",
        path: "/terms",
      },
      {
        key: "v1_0",
        label: "v1.0 (2026.03.16)",
        translationNamespace: "terms_v1_0",
        path: "/terms/v1_0",
      },
    ],
  },
  privacy: {
    type: "privacy",
    versions: [
      {
        key: "v2_0",
        label: "v2.0 (2026.04.10)",
        translationNamespace: "privacy",
        path: "/privacy",
      },
      {
        key: "v1_0",
        label: "v1.0 (2026.03.16)",
        translationNamespace: "privacy_v1_0",
        path: "/privacy/v1_0",
      },
    ],
  },
  consent: {
    type: "consent",
    versions: [
      {
        key: "v1_0",
        label: "v1.0 (2026.04.10)",
        translationNamespace: "consent",
        path: "/consent",
      },
    ],
  },
  "marketing-consent": {
    type: "marketing-consent",
    versions: [
      {
        key: "v1_0",
        label: "v1.0 (2026.04.10)",
        translationNamespace: "marketingConsent",
        path: "/marketing-consent",
      },
    ],
  },
};
