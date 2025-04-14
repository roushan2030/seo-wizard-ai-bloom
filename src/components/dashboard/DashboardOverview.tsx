
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardOverview = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Organic Traffic" 
          value="8,246" 
          change={12} 
          description="vs last month" 
        />
        <StatCard 
          title="Keywords Tracked" 
          value="156" 
          change={8} 
          description="new this week" 
          format={(val) => val.toString()}
        />
        <StatCard 
          title="Content Score" 
          value="84/100" 
          change={6} 
          description="vs last month" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <KeywordsCard />
        <ContentCard />
      </div>
    </>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  description: string;
  format?: (value: number) => string;
}

const StatCard = ({ title, value, change, description, format = (val) => `${val}%` }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardDescription>{title}</CardDescription>
      <CardTitle className="text-3xl font-bold">{value}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center text-sm">
        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
        <span className="text-green-600 font-medium">{format(change)} </span>
        <span className="text-gray-500 ml-1">{description}</span>
      </div>
    </CardContent>
  </Card>
);

const KeywordsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Top Performing Keywords</CardTitle>
      <CardDescription>Keywords that drive the most traffic to your site</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { keyword: "ai seo tools", position: 3, change: 2, volume: 6500 },
          { keyword: "content optimization", position: 5, change: -1, volume: 4200 },
          { keyword: "seo ai software", position: 2, change: 3, volume: 3100 },
          { keyword: "keyword research tools", position: 7, change: 1, volume: 5600 },
          { keyword: "ai content generator", position: 4, change: 0, volume: 2800 },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.keyword}</p>
              <p className="text-sm text-gray-500">Position {item.position}</p>
            </div>
            <div className="flex items-center">
              <div className={cn(
                "text-sm font-medium mr-4",
                item.change > 0 ? 'text-green-600' : 
                item.change < 0 ? 'text-red-600' : 'text-gray-500'
              )}>
                {item.change > 0 ? `+${item.change}` : item.change}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{item.volume.toLocaleString()}</p>
                <p className="text-xs text-gray-500">monthly searches</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button variant="link" className="text-seo-purple">
          View all keywords <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ContentCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Content Performance</CardTitle>
      <CardDescription>How your latest content pieces are performing</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { title: "10 Ways AI is Revolutionizing SEO", score: 92, traffic: 1240, date: "3 days ago" },
          { title: "The Ultimate Guide to Keyword Research", score: 87, traffic: 856, date: "1 week ago" },
          { title: "How to Optimize Your Content for Featured Snippets", score: 79, traffic: 612, date: "2 weeks ago" },
          { title: "SEO Best Practices for 2024", score: 95, traffic: 1850, date: "3 weeks ago" },
          { title: "Technical SEO Checklist for Beginners", score: 83, traffic: 735, date: "1 month ago" },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className={cn(
                  "font-medium",
                  item.score >= 90 ? 'text-green-600' : 
                  item.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                )}>{item.score}</p>
                <p className="text-xs text-gray-500">score</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{item.traffic}</p>
                <p className="text-xs text-gray-500">visits</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button variant="link" className="text-seo-purple">
          View all content <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default DashboardOverview;
