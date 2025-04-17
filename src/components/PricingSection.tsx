
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out the platform",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        "10 keyword searches per month",
        "Basic content analysis",
        "Limited rank tracking (5 keywords)",
        "Watermarked reports",
        "1 team member",
        "Community support"
      ],
      ctaText: "Get Started",
      ctaVariant: "outline" as const,
      accentClass: "bg-gray-100",
      ctaLink: "/signup"
    },
    {
      name: "Pro",
      description: "For growing businesses and content creators",
      monthlyPrice: "$99",
      yearlyPrice: "$79",
      yearlyTotal: "$948",
      features: [
        "Unlimited keyword research",
        "AI content optimization",
        "100 tracked keywords",
        "Competitor analysis",
        "Content generation (10k words/mo)",
        "3 team members",
        "Priority email support"
      ],
      ctaText: "Start Free Trial",
      ctaVariant: "default" as const,
      popular: true,
      accentClass: "bg-[#F2FCE2]",
      ctaLink: "/signup"
    },
    {
      name: "Business",
      description: "For marketing teams and agencies",
      monthlyPrice: "$299",
      yearlyPrice: "$239",
      yearlyTotal: "$2,868",
      features: [
        "All Pro features",
        "Unlimited content generation",
        "500 tracked keywords",
        "Advanced API access",
        "Technical SEO audits",
        "10+ team members",
        "White-label reports",
        "Dedicated success manager"
      ],
      ctaText: "Start Free Trial",
      ctaVariant: "outline" as const,
      accentClass: "bg-[#D3E4FD]",
      ctaLink: "/signup"
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      features: [
        "All Business features",
        "Custom API integration",
        "Unlimited tracked keywords",
        "Custom reporting dashboards",
        "Unlimited team members",
        "Dedicated account executive",
        "Onboarding & training",
        "SLA & premium support"
      ],
      ctaText: "Contact Sales",
      ctaVariant: "outline" as const,
      accentClass: "bg-[#FFDEE2]",
      ctaLink: "/pricing"
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Choose the plan that's right for your business.
          </p>

          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${isYearly ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>Monthly</span>
            <div className="flex items-center">
              <Switch 
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className={isYearly ? 'bg-seo-purple' : ''}
              />
            </div>
            <div className="flex items-center ml-3">
              <span className={isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}>Yearly</span>
              <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-seo-purple rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl border ${
                plan.popular 
                  ? 'border-seo-purple shadow-lg' 
                  : 'border-gray-200'
              } bg-white h-full flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-seo-gradient text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <div className={`${plan.accentClass} rounded-t-2xl p-6`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-5 text-sm">{plan.description}</p>
                <div className="mb-5">
                  <span className="text-4xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600">{plan.monthlyPrice !== "Custom" ? "/month" : ""}</span>
                  {isYearly && plan.yearlyTotal && (
                    <div className="text-gray-500 text-sm">
                      Billed annually (${plan.yearlyTotal})
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 flex-grow">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-seo-purple mr-2 shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <Button 
                  variant={plan.ctaVariant}
                  className={`w-full ${plan.popular && plan.ctaVariant === 'default' ? 'bg-seo-purple hover:bg-seo-purple-dark' : ''}`}
                  as={Link}
                  to={plan.ctaLink}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-2">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-gray-50 px-4 py-2 rounded-full text-sm">No credit card required</div>
            <div className="bg-gray-50 px-4 py-2 rounded-full text-sm">Cancel anytime</div>
            <div className="bg-gray-50 px-4 py-2 rounded-full text-sm">24/7 customer support</div>
            <div className="bg-gray-50 px-4 py-2 rounded-full text-sm">Regular updates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
