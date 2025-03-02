import { HeroSection } from "./_components/hero-section";
import { TeamSection } from "./_components/team-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { VendorsSection } from "./_components/vendors-section";
import { WhatSection } from "./_components/what-section";
import { WhySection } from "./_components/why-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhySection />
      <TeamSection />
      <VendorsSection />
      <WhatSection />
      <TestimonialsSection />
    </main>
  );
}
