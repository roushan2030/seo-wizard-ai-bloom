
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { generateDashboardPreview } from "@/services/imageGenerationService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [dashboardImage, setDashboardImage] = useState("https://placehold.co/1200x600/f5f7fa/a6acbe?text=SEO.ai+Dashboard+Preview");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    const fetchDashboardPreview = async () => {
      try {
        setIsGeneratingImage(true);
        const apiKey = import.meta.env.VITE_RUNWARE_API_KEY;
        if (!apiKey) {
          throw new Error('Runware API key is not set');
        }
        const previewImageUrl = await generateDashboardPreview(apiKey);
        setDashboardImage(previewImageUrl);
      } catch (error) {
        console.error('Failed to generate dashboard preview:', error);
        toast.error('Failed to generate dashboard preview', {
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      } finally {
        setIsGeneratingImage(false);
      }
    };

    fetchDashboardPreview();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section className="relative pt-28 pb-20 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-seo-purple/10 via-seo-purple/5 to-white opacity-50 blur-3xl pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          {/* Subtle Glow Effect */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-seo-purple/20 rounded-full blur-3xl animate-pulse-glow opacity-50"></div>
          
          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-seo-gradient">
            AI-Powered SEO to 
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
              className="px-4 py-3 w-full sm:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-seo-purple bg-white/80 backdrop-blur-sm"
              required
            />
            <Button 
              type="submit" 
              className="bg-seo-purple hover:bg-seo-purple-dark text-white px-6"
              as={Link}
              to="/signup"
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
          <div className="relative bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-200/50">
            <img 
              src={dashboardImage}
              alt="SEO.ai Dashboard Preview" 
              className={cn(
                "w-full h-auto transition-all duration-500 ease-in-out",
                isGeneratingImage ? "opacity-50 blur-sm" : "opacity-100 blur-none"
              )}
            />
            {isGeneratingImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse text-seo-purple">Generating preview...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
