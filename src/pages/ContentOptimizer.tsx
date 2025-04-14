
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Sparkles } from "lucide-react";

const ContentOptimizer = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Content Optimization</h1>
          <p className="text-gray-500">Improve your content's SEO performance</p>
        </div>
      </div>

      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Content Optimizer</CardTitle>
          <CardDescription>
            Get real-time suggestions to improve your content for better search rankings
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12 text-center">
          <div>
            <FileCheck className="h-16 w-16 text-seo-purple mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Content Optimizer Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This feature is under development. When complete, you'll be able to optimize your 
              content in real-time for better SEO performance.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Content Suggestions</CardTitle>
          <CardDescription>
            AI-powered suggestions to improve your existing content
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12 text-center">
          <div>
            <Sparkles className="h-16 w-16 text-seo-purple mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Content Suggestions Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This feature is under development. When complete, you'll get AI-powered suggestions 
              to improve your existing content for better rankings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentOptimizer;
