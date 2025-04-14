
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out the platform",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        "5 keyword searches per day",
        "Basic content analysis",
        "Limited rank tracking (3 keywords)",
        "Community support"
      ],
      ctaText: "Start Free",
      ctaVariant: "outline" as const
    },
    {
      name: "Pro",
      description: "For growing businesses and content creators",
      monthlyPrice: "$49",
      yearlyPrice: "$39",
      yearlyTotal: "$468",
      features: [
        "Unlimited keyword research",
        "AI content optimization",
        "100 tracked keywords",
        "Competitor analysis",
        "Content generation (10k words/mo)",
        "Priority email support"
      ],
      ctaText: "Start Pro Trial",
      ctaVariant: "default" as const,
      popular: true
    },
    {
      name: "Business",
      description: "For marketing teams and agencies",
      monthlyPrice: "$99",
      yearlyPrice: "$79",
      yearlyTotal: "$948",
      features: [
        "All Pro features",
        "Unlimited content generation",
        "500 tracked keywords",
        "Advanced API access",
        "Technical SEO audits",
        "White-label reports",
        "Dedicated success manager"
      ],
      ctaText: "Start Business Trial",
      ctaVariant: "outline" as const
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>

          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${isYearly ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
                isYearly ? 'bg-seo-purple' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center ml-3">
              <span className={isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}>Yearly</span>
              <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-seo-purple rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl border ${
                plan.popular 
                  ? 'border-seo-purple shadow-lg' 
                  : 'border-gray-200'
              } bg-white p-8`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-seo-gradient text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-5">{plan.description}</p>
              <div className="mb-5">
                <span className="text-4xl font-bold">
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-gray-600">/month</span>
                {isYearly && plan.yearlyTotal && (
                  <div className="text-gray-500 text-sm">
                    Billed annually (${plan.yearlyTotal})
                  </div>
                )}
              </div>
              <Button 
                variant={plan.ctaVariant}
                className={`w-full mb-6 ${plan.popular && plan.ctaVariant === 'default' ? 'bg-seo-purple hover:bg-seo-purple-dark' : ''}`}
              >
                {plan.ctaText}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-seo-purple mr-2 shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Need a custom solution for your enterprise?</p>
          <Button variant="link" className="text-seo-purple hover:text-seo-purple-dark">
            Contact our sales team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
