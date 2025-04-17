
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-seo-gradient rounded-2xl overflow-hidden shadow-lg">
        <div className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your SEO Strategy?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using AI to climb search rankings and drive more organic traffic.
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

export default CTA;
