export type LegalDocType = "terms" | "privacy" | "consent" | "marketing-consent";

export interface LegalVersion {
  key: string;
  label: string;
  translationNamespace: string;
  path: string;
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
        key: "v1_0",
        label: "v1.0 (2026.04.10)",
        translationNamespace: "terms",
        path: "/terms",
      },
    ],
  },
  privacy: {
    type: "privacy",
    versions: [
      {
        key: "v1_0",
        label: "v1.0 (2026.04.10)",
        translationNamespace: "privacy",
        path: "/privacy",
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
