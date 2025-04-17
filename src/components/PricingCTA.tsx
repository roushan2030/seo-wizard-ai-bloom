
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCTA = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto bg-seo-gradient rounded-2xl overflow-hidden shadow-lg">
        <div className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Still Unsure Which Plan is Right for You?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Our team is ready to help you find the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-seo-purple hover:bg-gray-100 hover:text-seo-purple-dark px-8 py-6 text-lg"
              as={Link}
              to="/signup"
            >
              Start Your Free Trial <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-[#FFDEE2] text-black border-black hover:bg-[#FFDEE2]/80 px-8 py-6 text-lg"
              as={Link}
              to="/pricing"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
