
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // Here you would handle the signup logic
  };

  return (
    <section className="pt-28 pb-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-seo-gradient">AI-Powered SEO</span> to 
            <br /> Supercharge Your Rankings
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Drive more organic traffic with our advanced AI platform that analyzes, optimizes, 
            and helps you create content that ranks higher on search engines.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 w-full sm:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-seo-purple"
              required
            />
            <Button 
              type="submit" 
              className="bg-seo-purple hover:bg-seo-purple-dark text-white px-6"
            >
              Start Free Trial <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-gray-700">
            <div className="flex items-center">
              <CheckCircle2 size={16} className="text-seo-purple mr-2" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 size={16} className="text-seo-purple mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 size={16} className="text-seo-purple mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-seo-gradient opacity-10 blur-xl rounded-xl"></div>
          <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <img 
              src="https://placehold.co/1200x600/f5f7fa/a6acbe?text=SEO.ai+Dashboard+Preview" 
              alt="SEO.ai Dashboard Preview" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
