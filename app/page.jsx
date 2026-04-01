import HeroSection from '@/components/landing/HeroSection';
import StatsBar from '@/components/landing/StatsBar';
import FeaturedBlogs from '@/components/landing/FeaturedBlogs';
import CategoriesStrip from '@/components/landing/CategoriesStrip';
import CallToAction from '@/components/landing/CallToAction';

export default function LandingPage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <StatsBar />
      <FeaturedBlogs />
      <CategoriesStrip />
      <CallToAction />
    </div>
  );
}
