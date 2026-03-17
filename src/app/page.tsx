import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CommunitiesShowcase from "@/components/landing/CommunitiesShowcase";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CtaBanner from "@/components/landing/CtaBanner";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CommunitiesShowcase />
        <Features />
        <Testimonials />
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
