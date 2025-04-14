
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
