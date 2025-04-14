
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, FileText, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's an overview of your SEO performance.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button className="bg-seo-purple hover:bg-seo-purple-dark text-white">
            <FileText className="h-4 w-4 mr-2" /> New Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Organic Traffic</CardDescription>
                <CardTitle className="text-3xl font-bold">8,246</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">12% </span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Keywords Tracked</CardDescription>
                <CardTitle className="text-3xl font-bold">156</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">8 </span>
                  <span className="text-gray-500 ml-1">new this week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Content Score</CardDescription>
                <CardTitle className="text-3xl font-bold">84/100</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">6% </span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        <div className={`text-sm font-medium mr-4 ${
                          item.change > 0 ? 'text-green-600' : 
                          item.change < 0 ? 'text-red-600' : 'text-gray-500'
                        }`}>
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
                          <p className={`font-medium ${
                            item.score >= 90 ? 'text-green-600' : 
                            item.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                          }`}>{item.score}</p>
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
          </div>
        </TabsContent>

        <TabsContent value="keywords">
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <div className="text-center p-4">
              <Search className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Switch to the Keywords tab from the main navigation to see your keyword data
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <div className="text-center p-4">
              <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Switch to the Content Generation tab from the main navigation to create content
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="competitors">
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <div className="text-center p-4">
              <TrendingUp className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Switch to the Competitors tab from the main navigation to analyze your competition
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
