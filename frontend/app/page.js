import FeaturedCountries from "@/components/featured-countries";
import HeroSection from "@/components/hero-section";
import RegionalExplorer from "@/components/regional-explorer";
import SearchSection from "@/components/search-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <SearchSection />
      <FeaturedCountries />
      <RegionalExplorer />
    </div>
  );
}
