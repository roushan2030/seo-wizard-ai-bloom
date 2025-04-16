
import { useState } from "react";
import { toast } from "sonner";

export type ContentScoreType = {
  overall: number;
  readability: number; 
  keywordDensity: number;
  semanticRelevance: number;
  sentiment: number;
  headlineStrength: number;
};

export type RecommendationType = {
  id: string;
  category: 'readability' | 'keywords' | 'structure' | 'seo' | 'headline';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  improvement: string;
};

const initialContentScore: ContentScoreType = {
  overall: 0,
  readability: 0,
  keywordDensity: 0,
  semanticRelevance: 0,
  sentiment: 0,
  headlineStrength: 0,
};

export const useContentOptimizer = () => {
  const [content, setContent] = useState<string>("");
  const [contentScore, setContentScore] = useState<ContentScoreType>(initialContentScore);
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock readability scoring for now (Flesch-Kincaid)
  const calculateReadabilityScore = (text: string): number => {
    // Simple implementation: longer sentences and words decrease score
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const words = text.split(/\s+/).filter(Boolean);
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    const avgSentenceLength = words.length / sentences.length;
    const avgWordLength = text.replace(/[^\w]/g, '').length / words.length;
    
    // Scale between 0-100, lower is better for these metrics
    let readabilityScore = 100 - (avgSentenceLength * 4) - (avgWordLength * 3);
    return Math.max(0, Math.min(100, readabilityScore));
  };
  
  // Mock keyword density analysis
  const analyzeKeywordDensity = (text: string): number => {
    // This is a mock implementation
    // In real implementation, this would analyze keyword frequency
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    const uniqueWords = new Set(words);
    
    // For now, just return a score based on word diversity
    const diversityRatio = uniqueWords.size / words.length;
    return Math.min(100, diversityRatio * 100);
  };
  
  // Generate demo recommendations based on content
  const generateRecommendations = (text: string, score: ContentScoreType): RecommendationType[] => {
    const recs: RecommendationType[] = [];
    
    // Readability recommendations
    if (score.readability < 60) {
      recs.push({
        id: "read-1",
        category: "readability",
        title: "Improve Sentence Length",
        description: "Your content has several long sentences that may be difficult to read.",
        severity: "medium",
        improvement: "Try breaking longer sentences into shorter ones for better readability."
      });
    }
    
    // Keyword recommendations
    if (score.keywordDensity < 50) {
      recs.push({
        id: "key-1",
        category: "keywords",
        title: "Low Keyword Density",
        description: "Your content could benefit from more targeted keywords.",
        severity: "high",
        improvement: "Try incorporating more relevant keywords naturally throughout your content."
      });
    }
    
    // Structure recommendations
    if (text.length > 100 && !text.includes("#") && !text.includes("\n\n")) {
      recs.push({
        id: "struct-1",
        category: "structure",
        title: "Improve Content Structure",
        description: "Your content lacks clear headings and paragraph breaks.",
        severity: "medium",
        improvement: "Add headings (H2, H3) and break up large paragraphs for better readability."
      });
    }
    
    // SEO recommendations
    recs.push({
      id: "seo-1",
      category: "seo",
      title: "Meta Description Optimization",
      description: "Adding a compelling meta description will improve click-through rates.",
      severity: "medium",
      improvement: "Create a concise meta description that includes your primary keyword."
    });
    
    // Headline recommendations if content starts with what looks like a title
    const firstLine = text.split("\n")[0].trim();
    if (firstLine && firstLine.length < 80) {
      recs.push({
        id: "headline-1",
        category: "headline",
        title: "Headline Analysis",
        description: "Your headline could be more compelling.",
        severity: "low",
        improvement: "Consider adding power words or numbers to make your headline more engaging."
      });
    }
    
    return recs;
  };

  // Main function to analyze content
  const analyzeContent = async () => {
    if (!content.trim()) {
      toast.error("Please enter content to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate scores
      const readabilityScore = calculateReadabilityScore(content);
      const keywordDensityScore = analyzeKeywordDensity(content);
      
      // Mock other scores for demonstration
      const semanticScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
      const sentimentScore = Math.floor(Math.random() * 30) + 70; // 70-100 range
      const headlineScore = Math.floor(Math.random() * 50) + 50; // 50-100 range
      
      // Calculate overall score (weighted average)
      const overallScore = Math.round(
        (readabilityScore * 0.25) +
        (keywordDensityScore * 0.2) +
        (semanticScore * 0.25) +
        (sentimentScore * 0.15) +
        (headlineScore * 0.15)
      );
      
      const newScores = {
        overall: overallScore,
        readability: readabilityScore,
        keywordDensity: keywordDensityScore,
        semanticRelevance: semanticScore,
        sentiment: sentimentScore,
        headlineStrength: headlineScore,
      };
      
      setContentScore(newScores);
      
      // Generate recommendations
      const recs = generateRecommendations(content, newScores);
      setRecommendations(recs);
      
      toast.success("Content analysis complete!");
    } catch (error) {
      console.error("Error analyzing content:", error);
      toast.error("Failed to analyze content. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    content,
    setContent,
    contentScore,
    recommendations,
    isAnalyzing,
    analyzeContent
  };
};
