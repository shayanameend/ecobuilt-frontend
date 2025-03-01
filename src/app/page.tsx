import { HeroSection } from "./_components/hero-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { WhatSection } from "./_components/what-section";
import { WhySection } from "./_components/why-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhySection />
      <WhatSection />
      <TestimonialsSection />
    </main>
  );
}
