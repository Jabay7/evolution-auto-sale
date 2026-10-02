import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FleetSection } from "@/components/FleetSection";
import { FleetScaleSection } from "@/components/FleetScaleSection";
import { WhyEvolution } from "@/components/WhyEvolution";
import { HowItWorks } from "@/components/HowItWorks";
import { OceansideSection } from "@/components/OceansideSection";
import { GallerySection } from "@/components/GallerySection";
import { InstagramSection } from "@/components/InstagramSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { StudioBackdrop } from "@/components/StudioBackdrop";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <StudioBackdrop />
      <Navbar />
      <main>
        <Hero />
        <FleetSection />
        <FleetScaleSection />
        <WhyEvolution />
        <HowItWorks />
        <OceansideSection />
        <GallerySection />
        <InstagramSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
