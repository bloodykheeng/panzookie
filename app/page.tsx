import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Support from "@/components/Support";
import Enterprise from "@/components/Enterprise";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <Support />
      <Enterprise />
      <WhyUs />
      <Contact />
      <Footer />
      <MobileCTA />
      <ScrollToTop />
    </>
  );
}