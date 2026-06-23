import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import IntroSection from '@/components/IntroSection';
import HeroSection from '@/components/HeroSection';
import PlatformStatement from '@/components/PlatformStatement';
import EcosystemSection from '@/components/EcosystemSection';
import StatsSection from '@/components/StatsSection';
import FeaturedWorksSection from '@/components/FeaturedWorksSection';
import FabricationIntelligenceSection from '@/components/FabricationIntelligenceSection';
import CallToActionSection from '@/components/CallToActionSection';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = pageMetadata({
  name: 'AMD NSRI',
  path: '/',
  absoluteTitle: 'AMD NSRI — Computational Design & Fabrication Intelligence',
  description:
    'AMD NSRI — computational design, facade engineering and fabrication intelligence. Based in Istanbul.',
});

export default function HomePage() {
  return (
    <>
      <IntroSection />
      <HeroSection />
      <PlatformStatement />
      <EcosystemSection />
      <StatsSection />
      <FeaturedWorksSection />
      <FabricationIntelligenceSection />
      <CallToActionSection />
      <SiteFooter />
    </>
  );
}
