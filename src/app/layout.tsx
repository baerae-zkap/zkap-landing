import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://zkap-landing.vercel.app"),
  title: "ZKAP - 해외 가상자산 세금 신고",
  description: "해외 거래소 자산, 쉽고 정확하게 신고하세요. Binance, Bybit, OKX, Coinbase 자동 연동.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ZKAP - 해외 가상자산 세금 신고",
    description: "해외 거래소 자산, 쉽고 정확하게 신고하세요. Binance, Bybit, OKX, Coinbase 자동 연동.",
    url: "https://zkap-landing.vercel.app",
    siteName: "ZKAP",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZKAP - 해외 가상자산 세금 신고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZKAP - 해외 가상자산 세금 신고",
    description: "해외 거래소 자산, 쉽고 정확하게 신고하세요.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
