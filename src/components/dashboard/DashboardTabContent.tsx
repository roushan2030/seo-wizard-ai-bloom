
import React from "react";
import { Search, FileText, TrendingUp } from "lucide-react";

interface PlaceholderContentProps {
  icon: React.ElementType;
  message: string;
}

const PlaceholderContent = ({ icon: Icon, message }: PlaceholderContentProps) => {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
      <div className="text-center p-4">
        <Icon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export const KeywordsTabContent = () => (
  <PlaceholderContent 
    icon={Search} 
    message="Switch to the Keywords tab from the main navigation to see your keyword data" 
  />
);

export const ContentTabContent = () => (
  <PlaceholderContent 
    icon={FileText} 
    message="Switch to the Content Generation tab from the main navigation to create content" 
  />
);

export const CompetitorsTabContent = () => (
  <PlaceholderContent 
    icon={TrendingUp} 
    message="Switch to the Competitors tab from the main navigation to analyze your competition" 
  />
);
