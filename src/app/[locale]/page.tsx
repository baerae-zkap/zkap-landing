import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"));
const RiskWarningSection = dynamic(() => import("@/components/sections/RiskWarningSection"));
const ReliefFolderSection = dynamic(() => import("@/components/sections/ReliefFolderSection"));
const ExchangeAssetSection = dynamic(() => import("@/components/sections/ExchangeAssetSection"));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const FinalCTASection = dynamic(() => import("@/components/sections/FinalCTASection"));

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
