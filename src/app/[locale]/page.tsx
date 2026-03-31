import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import RiskWarningSection from "@/components/sections/RiskWarningSection";
import ReliefFolderSection from "@/components/sections/ReliefFolderSection";
import ExchangeAssetSection from "@/components/sections/ExchangeAssetSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <RiskWarningSection />
        <ReliefFolderSection />
        <ExchangeAssetSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
