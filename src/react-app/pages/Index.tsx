import { Navigation } from "../components/wedding/Navigation";
import { HeroSection } from "../components/wedding/HeroSection";
import { DetailsSection } from "../components/wedding/DetailsSection";
import { TimelineSection } from "../components/wedding/TimelineSection";
import { VenueSection } from "../components/wedding/VenueSection";
import { FAQSection } from "../components/wedding/FAQSection";
import { RSVPSection } from "../components/wedding/RSVPSection";
import { MusicPlayer } from "../components/wedding/MusicPlayer";
import { Footer } from "../components/wedding/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DetailsSection />
      <TimelineSection />
      <VenueSection />
      <FAQSection />
      <RSVPSection />
      <Footer />
      <MusicPlayer />
    </main>
  );
};

export default Index;
