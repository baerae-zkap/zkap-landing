import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import RiskWarningSection from "@/components/sections/RiskWarningSection";
import SelfDiagnosisSection from "@/components/sections/SelfDiagnosisSection";
import ReliefSection from "@/components/sections/ReliefSection";
import ExchangeAssetSection from "@/components/sections/ExchangeAssetSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TrustSection from "@/components/sections/TrustSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <RiskWarningSection />
        <SelfDiagnosisSection />
        <ReliefSection />
        <ExchangeAssetSection />
        <ProcessSection />
        <TrustSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
