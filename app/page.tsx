import HeroSection from "./components/HeroSection";
import ContentSection from "./components/ContentSection";
import LocationSection from "./components/LocationSection";
import FooterSection from "./components/FooterSection";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ContentSection />
      <LocationSection />
      <FooterSection />
      <WhatsAppButton />
    </>
  );
}
