import type { Metadata } from 'next';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import IntroSection from '@/components/IntroSection';
import HeroSection from '@/components/HeroSection';
import PlatformStatement from '@/components/PlatformStatement';
import EcosystemSection from '@/components/EcosystemSection';
import StatsSection from '@/components/StatsSection';
import FeaturedWorksSection from '@/components/FeaturedWorksSection';
import FabricationIntelligenceSection from '@/components/FabricationIntelligenceSection';
import CallToActionSection from '@/components/CallToActionSection';
import NewsletterSection from '@/components/NewsletterSection';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = pageMetadata({
  name: 'AMD NSRI',
  path: '/',
  absoluteTitle: 'AMD NSRI — Computational Design & Fabrication Intelligence',
  description:
    'AMD NSRI — computational design, facade engineering and fabrication intelligence. Based in Istanbul.',
});

// Tells search engines the site's name ("AMD NSRI"), which they show above the result; homepage only, as Google asks
const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AMD NSRI',
  alternateName: 'AMD NSRI',
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }} />
      <IntroSection />
      <HeroSection />
      {/* Selected Works comes right after the hero */}
      <FeaturedWorksSection />
      <PlatformStatement />
      <EcosystemSection />
      <StatsSection />
      <FabricationIntelligenceSection />
      <CallToActionSection />
      {/* renders nothing while the newsletter is off (NEWSLETTER_MODE) */}
      <NewsletterSection />
      <SiteFooter />
    </>
  );
}
