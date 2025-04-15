
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "SEO.ai transformed our content strategy. We've seen a 47% increase in organic traffic in just three months after implementing their recommendations.",
    author: "Sarah Johnson",
    position: "Marketing Director, TechCorp",
    avatar: "https://placehold.co/100x100/9b87f5/ffffff?text=SJ",
    plan: "Business Plan"
  },
  {
    quote: "The keyword research tool saved us countless hours of manual work. The AI suggestions have helped us discover opportunities we would have missed.",
    author: "Michael Chen",
    position: "SEO Manager, GrowthFirm",
    avatar: "https://placehold.co/100x100/9b87f5/ffffff?text=MC",
    plan: "Pro Plan"
  },
  {
    quote: "SEO.ai's content generation has been a game-changer for our blog. It produces high-quality articles that rank well and engage our audience.",
    author: "Jessica Smith",
    position: "Content Strategist, MediaMax",
    avatar: "https://placehold.co/100x100/9b87f5/ffffff?text=JS",
    plan: "Business Plan"
  }
];

const trustLogos = [
  { name: "Company 1", src: "https://placehold.co/120x40/9b87f5/ffffff?text=LOGO1" },
  { name: "Company 2", src: "https://placehold.co/120x40/9b87f5/ffffff?text=LOGO2" },
  { name: "Company 3", src: "https://placehold.co/120x40/9b87f5/ffffff?text=LOGO3" },
  { name: "Company 4", src: "https://placehold.co/120x40/9b87f5/ffffff?text=LOGO4" },
  { name: "Company 5", src: "https://placehold.co/120x40/9b87f5/ffffff?text=LOGO5" },
];

const PricingTestimonials = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by 10,000+ Marketers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses are transforming their SEO strategy with our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <Quote className="h-10 w-10 text-seo-purple opacity-20 mb-4" />
                <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-xs text-seo-purple mt-1">{testimonial.plan}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustLogos.map((logo, index) => (
              <img 
                key={index} 
                src={logo.src} 
                alt={logo.name} 
                className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTestimonials;
