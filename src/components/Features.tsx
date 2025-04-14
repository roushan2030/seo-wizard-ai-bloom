
import { SearchCheck, TrendingUp, FileEdit, LineChart, Cpu, ShieldCheck } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      icon: <SearchCheck className="h-10 w-10 text-seo-purple p-2 bg-seo-purple-light bg-opacity-30 rounded-lg" />,
      title: "Keyword Research",
      description: "Discover high-value keywords with volume, difficulty scores, and competitive analysis to target the right opportunities."
    },
    {
      icon: <FileEdit className="h-10 w-10 text-seo-purple p-2 bg-seo-purple-light bg-opacity-30 rounded-lg" />,
      title: "Content Optimization",
      description: "Get real-time optimization suggestions as you write, ensuring your content meets search engine criteria."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-seo-purple p-2 bg-seo-purple-light bg-opacity-30 rounded-lg" />,
      title: "Rank Tracking",
      description: "Monitor your positions for targeted keywords and track performance changes over time."
    },
    {
      icon: <Cpu className="h-10 w-10 text-seo-purple p-2 bg-seo-purple-light bg-opacity-30 rounded-lg" />,
      title: "AI Content Generation",
      description: "Create SEO-optimized content with our advanced AI that understands search intent and ranking factors."
    },
    {
      icon: <LineChart className="h-10 w-10 text-seo-purple p-2 bg-seo-purple-light bg-opacity-30 rounded-lg" />,
      title: "Competitor Analysis",
      description: "Analyze competitors' strategies, find content gaps, and discover opportunities to outrank them."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-seo-purple p-2 bg-seo-purple-light bg-opacity-30 rounded-lg" />,
      title: "Technical SEO Audits",
      description: "Identify and fix technical issues that could be hurting your search visibility and site performance."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful AI-Driven SEO Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you optimize your content, 
            understand your market, and climb the search engine rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
