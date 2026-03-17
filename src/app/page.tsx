import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import WhatIsSippe from "@/components/landing/WhatIsSippe";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CtaBanner from "@/components/landing/CtaBanner";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsSippe />
        <Features />
        <Testimonials />
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
