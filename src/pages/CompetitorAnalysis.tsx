
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const CompetitorAnalysis = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Competitor Analysis</h1>
          <p className="text-gray-500">Analyze your competitors' SEO strategies</p>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Competitor Analysis</CardTitle>
          <CardDescription>
            Compare your performance against competitors and identify opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12 text-center">
          <div>
            <Users className="h-16 w-16 text-seo-purple mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Competitor Analysis Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This feature is under development. When complete, you'll be able to analyze 
              your competitors' SEO strategies, identify content gaps, and discover new opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalysis;
