
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "SEO.ai transformed our content strategy. We've seen a 47% increase in organic traffic in just three months after implementing their AI recommendations.",
    author: "Sarah Johnson",
    position: "Marketing Director at TechCorp",
    avatar: "https://placehold.co/100x100/9b87f5/ffffff?text=SJ"
  },
  {
    quote: "The keyword research tool saved us countless hours of manual work. The AI suggestions are spot-on and have helped us discover opportunities we would have missed.",
    author: "Michael Chen",
    position: "SEO Manager at GrowthFirm",
    avatar: "https://placehold.co/100x100/9b87f5/ffffff?text=MC"
  },
  {
    quote: "I was skeptical about AI-generated content, but SEO.ai produces incredibly natural, high-quality articles that rank well. It's been a game-changer for our blog.",
    author: "Jessica Smith",
    position: "Content Strategist at MediaMax",
    avatar: "https://placehold.co/100x100/9b87f5/ffffff?text=JS"
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses are transforming their SEO strategy with our AI-powered platform.
          </p>
        </div>

        <div className="relative">
          <Card className="bg-white border-none shadow-xl">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-seo-purple opacity-20 mb-4" />
              <div className="mb-8">
                <p className="text-xl md:text-2xl text-gray-700 italic mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].author}
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonials[activeIndex].author}</h4>
                    <p className="text-gray-600">{testimonials[activeIndex].position}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8 gap-3">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-seo-purple scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
