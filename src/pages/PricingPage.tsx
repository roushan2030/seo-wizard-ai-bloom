
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import PricingComparison from "@/components/PricingComparison";
import PricingFAQ from "@/components/PricingFAQ";
import PricingTestimonials from "@/components/PricingTestimonials";
import PricingCTA from "@/components/PricingCTA";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful SEO Tools, Fair Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get AI-driven insights at a price that scales with you.
            </p>
          </div>
        </div>
        <PricingSection />
        <PricingComparison />
        <PricingTestimonials />
        <PricingFAQ />
        <PricingCTA />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
