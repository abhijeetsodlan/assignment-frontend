import HeroSection from '@/components/landing/HeroSection';
import StatsBar from '@/components/landing/StatsBar';
import FeaturedBlogs from '@/components/landing/FeaturedBlogs';
import CategoriesStrip from '@/components/landing/CategoriesStrip';
import CallToAction from '@/components/landing/CallToAction';

export const metadata = {
  title: 'Home',
  description: 'Explore featured stories, browse categories, and discover the latest articles on BlogSphere.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'BlogSphere | Modern Blog Platform',
    description: 'Explore featured stories, browse categories, and discover the latest articles on BlogSphere.',
    url: '/'
  },
  twitter: {
    title: 'BlogSphere | Modern Blog Platform',
    description: 'Explore featured stories, browse categories, and discover the latest articles on BlogSphere.'
  }
};

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
