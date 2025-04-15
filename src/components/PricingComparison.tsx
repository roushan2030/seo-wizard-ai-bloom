
import React from "react";
import { Check, X } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const features = [
  {
    category: "Keyword Research",
    items: [
      { name: "Monthly keyword searches", free: "10", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Keyword difficulty scores", free: false, pro: true, business: true, enterprise: true },
      { name: "Keyword suggestions", free: "Limited", pro: "Advanced", business: "Advanced+", enterprise: "Custom" },
      { name: "Search intent analysis", free: false, pro: true, business: true, enterprise: true },
      { name: "Local keyword research", free: false, pro: true, business: true, enterprise: true }
    ]
  },
  {
    category: "Content Optimization",
    items: [
      { name: "AI content recommendations", free: false, pro: true, business: true, enterprise: true },
      { name: "Content readability scores", free: "Basic", pro: "Advanced", business: "Advanced", enterprise: "Advanced" },
      { name: "Content generation", free: false, pro: "10k words/mo", business: "Unlimited", enterprise: "Unlimited" },
      { name: "SEO content templates", free: false, pro: "5", business: "20", enterprise: "Unlimited" },
      { name: "Content performance tracking", free: false, pro: true, business: true, enterprise: true }
    ]
  },
  {
    category: "Rank Tracking",
    items: [
      { name: "Tracked keywords", free: "5", pro: "100", business: "500", enterprise: "Unlimited" },
      { name: "Competitor rank tracking", free: false, pro: "3 competitors", business: "10 competitors", enterprise: "Unlimited" },
      { name: "Rank tracking frequency", free: "Weekly", pro: "Daily", business: "Daily", enterprise: "Real-time" },
      { name: "Historical data", free: "30 days", pro: "1 year", business: "2 years", enterprise: "Unlimited" },
      { name: "Custom alerts", free: false, pro: true, business: true, enterprise: true }
    ]
  },
  {
    category: "Reporting & Integrations",
    items: [
      { name: "White-label reports", free: false, pro: false, business: true, enterprise: true },
      { name: "Report scheduling", free: false, pro: true, business: true, enterprise: true },
      { name: "API access", free: false, pro: "Basic", business: "Advanced", enterprise: "Enterprise" },
      { name: "Third-party integrations", free: false, pro: "Limited", business: "Full access", enterprise: "Custom" },
      { name: "Custom dashboards", free: false, pro: false, business: "Limited", enterprise: "Unlimited" }
    ]
  },
  {
    category: "Support",
    items: [
      { name: "Customer support", free: "Community", pro: "Email", business: "Priority email", enterprise: "24/7 dedicated" },
      { name: "Onboarding", free: false, pro: "Self-serve", business: "1 session", enterprise: "Custom program" },
      { name: "Training materials", free: "Limited", pro: true, business: true, enterprise: true },
      { name: "Customer success manager", free: false, pro: false, business: "Shared", enterprise: "Dedicated" },
      { name: "SLA", free: false, pro: false, business: false, enterprise: true }
    ]
  }
];

const PricingComparison = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compare Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See which plan best fits your business needs
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="w-1/3 text-left">Feature</TableHead>
                <TableHead className="w-1/6 text-center">Free</TableHead>
                <TableHead className="w-1/6 text-center">Pro</TableHead>
                <TableHead className="w-1/6 text-center">Business</TableHead>
                <TableHead className="w-1/6 text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, featureIndex) => (
                <React.Fragment key={featureIndex}>
                  <TableRow className="bg-gray-100">
                    <TableCell colSpan={5} className="font-semibold text-gray-800">
                      {feature.category}
                    </TableCell>
                  </TableRow>
                  {feature.items.map((item, itemIndex) => (
                    <TableRow key={itemIndex} className="border-b">
                      <TableCell className="py-3">{item.name}</TableCell>
                      <TableCell className="text-center py-3">
                        {typeof item.free === 'boolean' ? (
                          item.free ? <Check className="mx-auto w-5 h-5 text-seo-purple" /> : <X className="mx-auto w-5 h-5 text-gray-300" />
                        ) : (
                          <span>{item.free}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-3">
                        {typeof item.pro === 'boolean' ? (
                          item.pro ? <Check className="mx-auto w-5 h-5 text-seo-purple" /> : <X className="mx-auto w-5 h-5 text-gray-300" />
                        ) : (
                          <span>{item.pro}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-3">
                        {typeof item.business === 'boolean' ? (
                          item.business ? <Check className="mx-auto w-5 h-5 text-seo-purple" /> : <X className="mx-auto w-5 h-5 text-gray-300" />
                        ) : (
                          <span>{item.business}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-3">
                        {typeof item.enterprise === 'boolean' ? (
                          item.enterprise ? <Check className="mx-auto w-5 h-5 text-seo-purple" /> : <X className="mx-auto w-5 h-5 text-gray-300" />
                        ) : (
                          <span>{item.enterprise}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
