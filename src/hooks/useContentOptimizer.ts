
import { useState } from "react";
import { toast } from "sonner";

export type ContentScoreType = {
  overall: number;
  readability: number; 
  keywordDensity: number;
  semanticRelevance: number;
  sentiment: number;
  headlineStrength: number;
  topicRelevance: number;
  contentStructure: number;
  seoScore: number;
};

export type RecommendationType = {
  id: string;
  category: 'readability' | 'keywords' | 'structure' | 'seo' | 'headline' | 'topic' | 'meta';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  improvement: string;
};

export type ContentAnalysisType = {
  wordCount: number;
  sentenceCount: number;
  averageSentenceLength: number;
  averageWordLength: number;
  paragraphCount: number;
  readingTime: number;
  keywordDensity: Record<string, number>;
  topKeywords: {word: string, count: number, density: number}[];
  headings: {level: number, text: string}[];
  sentimentAnalysis: {positive: number, neutral: number, negative: number};
};

export type MetaTagsType = {
  title: string;
  description: string;
  keywords: string[];
};

const initialContentScore: ContentScoreType = {
  overall: 0,
  readability: 0,
  keywordDensity: 0,
  semanticRelevance: 0,
  sentiment: 0,
  headlineStrength: 0,
  topicRelevance: 0,
  contentStructure: 0,
  seoScore: 0,
};

const initialContentAnalysis: ContentAnalysisType = {
  wordCount: 0,
  sentenceCount: 0,
  averageSentenceLength: 0,
  averageWordLength: 0,
  paragraphCount: 0,
  readingTime: 0,
  keywordDensity: {},
  topKeywords: [],
  headings: [],
  sentimentAnalysis: {positive: 0, neutral: 0, negative: 0},
};

const initialMetaTags: MetaTagsType = {
  title: "",
  description: "",
  keywords: [],
};

export const useContentOptimizer = () => {
  const [content, setContent] = useState<string>("");
  const [targetKeywords, setTargetKeywords] = useState<string>("");
  const [targetTopic, setTargetTopic] = useState<string>("");
  const [contentScore, setContentScore] = useState<ContentScoreType>(initialContentScore);
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysisType>(initialContentAnalysis);
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);
  const [metaTags, setMetaTags] = useState<MetaTagsType>(initialMetaTags);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [historicalData, setHistoricalData] = useState<{date: string, score: number}[]>([]);
  const [competitorData, setCompetitorData] = useState<{name: string, score: number}[]>([]);

  // Advanced readability scoring (Flesch-Kincaid)
  const calculateReadabilityScore = (text: string): number => {
    if (!text || text.trim() === '') return 0;
    
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const words = text.split(/\s+/).filter(Boolean);
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    const totalSyllables = words.reduce((total, word) => {
      return total + countSyllables(word);
    }, 0);
    
    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = totalSyllables / words.length;
    
    // Flesch-Kincaid Grade Level formula
    let fleschKincaid = 0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59;
    fleschKincaid = Math.max(0, Math.min(18, fleschKincaid));
    
    // Convert to a 0-100 score (lower grade level = higher score)
    const readabilityScore = Math.max(0, Math.min(100, 100 - (fleschKincaid * 5)));
    return Math.round(readabilityScore);
  };
  
  // Helper function to estimate syllables in a word
  const countSyllables = (word: string): number => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    
    // Count vowel groups as syllables
    const vowels = word.match(/[aeiouy]+/g);
    let count = vowels ? vowels.length : 0;
    
    // Adjust for common patterns
    if (word.endsWith('e')) count--;
    if (word.endsWith('le') && word.length > 2) count++;
    if (count === 0) count = 1;
    
    return count;
  };
  
  // Keyword density analysis
  const analyzeKeywordDensity = (text: string, targetKeywords: string): {score: number, analysis: Record<string, number>, topKeywords: {word: string, count: number, density: number}[]} => {
    if (!text || text.trim() === '') {
      return {score: 0, analysis: {}, topKeywords: []};
    }
    
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const wordFrequency: Record<string, number> = {};
    
    // Count word frequency
    words.forEach(word => {
      // Clean the word
      const cleanWord = word.replace(/[^\w]/g, '');
      if (cleanWord && cleanWord.length > 3) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });
    
    // Get top keywords
    const topKeywords = Object.entries(wordFrequency)
      .map(([word, count]) => ({
        word,
        count,
        density: Number((count / wordCount * 100).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Calculate score based on target keywords
    let keywordScore = 50; // Default score
    if (targetKeywords) {
      const keywordsArray = targetKeywords.toLowerCase().split(',').map(k => k.trim());
      let foundKeywords = 0;
      
      keywordsArray.forEach(keyword => {
        // Check for exact match
        const exactMatchDensity = wordFrequency[keyword] ? (wordFrequency[keyword] / wordCount) * 100 : 0;
        
        // Check for partial matches
        const partialMatches = topKeywords.filter(k => k.word.includes(keyword) || keyword.includes(k.word));
        const partialMatchDensity = partialMatches.reduce((total, match) => total + match.density, 0);
        
        const totalDensity = exactMatchDensity + partialMatchDensity;
        
        if (totalDensity > 0) {
          foundKeywords++;
          
          // Optimal density is around 1-3%
          if (totalDensity > 0.5 && totalDensity < 5) {
            keywordScore += 10;
          } else if (totalDensity > 5) {
            // Keyword stuffing penalty
            keywordScore -= 5;
          }
        }
      });
      
      // Bonus for finding most of the target keywords
      const keywordCoverage = foundKeywords / keywordsArray.length;
      keywordScore += Math.round(keywordCoverage * 30);
    }
    
    return {
      score: Math.max(0, Math.min(100, keywordScore)),
      analysis: wordFrequency,
      topKeywords
    };
  };
  
  // Content structure analysis
  const analyzeContentStructure = (text: string): {score: number, headings: {level: number, text: string}[], paragraphCount: number} => {
    if (!text || text.trim() === '') {
      return {score: 0, headings: [], paragraphCount: 0};
    }
    
    // Identify headings (# for h1, ## for h2, etc.)
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: {level: number, text: string}[] = [];
    let match;
    
    while ((match = headingRegex.exec(text)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2].trim()
      });
    }
    
    // Count paragraphs (separated by blank lines)
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
    const paragraphCount = paragraphs.length;
    
    // Score based on structure
    let structureScore = 50;
    
    // Has at least one heading
    if (headings.length > 0) structureScore += 10;
    
    // Has hierarchical structure (h1 > h2 > h3...)
    const hasH1 = headings.some(h => h.level === 1);
    const hasH2 = headings.some(h => h.level === 2);
    if (hasH1 && hasH2) structureScore += 10;
    
    // Has enough paragraphs for readability
    if (paragraphCount >= 3) structureScore += 10;
    
    // Paragraphs aren't too long
    const avgParagraphLength = text.length / paragraphCount;
    if (avgParagraphLength < 1000) structureScore += 10;
    
    // Has a good heading-to-content ratio
    const contentPerHeading = text.length / (headings.length || 1);
    if (contentPerHeading > 200 && contentPerHeading < 2000) structureScore += 10;
    
    return {
      score: Math.max(0, Math.min(100, structureScore)),
      headings,
      paragraphCount
    };
  };
  
  // Simple sentiment analysis
  const analyzeSentiment = (text: string): {score: number, analysis: {positive: number, neutral: number, negative: number}} => {
    if (!text || text.trim() === '') {
      return {score: 0, analysis: {positive: 0, neutral: 0, negative: 0}};
    }
    
    // Very basic implementation using simple word lists
    // In a real implementation, this would use a proper NLP library
    const positiveWords = ['good', 'great', 'excellent', 'best', 'amazing', 'wonderful', 'fantastic', 
                          'helpful', 'beneficial', 'valuable', 'useful', 'positive', 'success', 
                          'improve', 'better', 'advantage', 'effective', 'efficient', 'easy'];
    
    const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'awful', 'horrible', 'useless',
                          'difficult', 'hard', 'complicated', 'confusing', 'negative', 'fail', 
                          'problem', 'issue', 'disadvantage', 'ineffective', 'inefficient'];
    
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (positiveWords.includes(cleanWord)) positiveCount++;
      if (negativeWords.includes(cleanWord)) negativeCount++;
    });
    
    const totalSentimentWords = positiveCount + negativeCount;
    const neutralCount = words.length - totalSentimentWords;
    
    // Calculate percentages
    const total = words.length || 1; // Avoid division by zero
    const positive = Number(((positiveCount / total) * 100).toFixed(1));
    const negative = Number(((negativeCount / total) * 100).toFixed(1));
    const neutral = Number(((neutralCount / total) * 100).toFixed(1));
    
    // Calculate sentiment score (higher is more positive)
    let sentimentScore = 50; // Neutral baseline
    if (totalSentimentWords > 0) {
      sentimentScore = Math.round(50 + ((positiveCount - negativeCount) / totalSentimentWords) * 50);
    }
    
    return {
      score: Math.max(0, Math.min(100, sentimentScore)),
      analysis: {positive, neutral, negative}
    };
  };
  
  // Headline analysis
  const analyzeHeadline = (text: string): number => {
    if (!text || text.trim() === '') return 0;
    
    // Extract the first line as the headline
    const headline = text.split('\n')[0].trim();
    if (!headline) return 0;
    
    let score = 50;
    
    // Length check (optimal headline length 5-9 words)
    const words = headline.split(/\s+/).filter(Boolean);
    if (words.length >= 5 && words.length <= 9) {
      score += 10;
    } else if (words.length > 9 && words.length <= 12) {
      score += 5;
    }
    
    // Power words check
    const powerWords = ['you', 'free', 'now', 'discover', 'new', 'results', 'guarantee', 'proven', 
                      'easy', 'simple', 'how to', 'best', 'ultimate', 'essential', 'secret', 'amazing'];
    
    const hasPowerWord = powerWords.some(word => 
      headline.toLowerCase().includes(word.toLowerCase())
    );
    
    if (hasPowerWord) score += 10;
    
    // Number in headline
    const hasNumber = /\d+/.test(headline);
    if (hasNumber) score += 10;
    
    // Emotional words
    const emotionalWords = ['love', 'hate', 'fear', 'incredible', 'amazing', 'awful', 'wonderful', 
                          'terrible', 'shocking', 'surprising', 'stunning', 'remarkable'];
    
    const hasEmotionalWord = emotionalWords.some(word => 
      headline.toLowerCase().includes(word.toLowerCase())
    );
    
    if (hasEmotionalWord) score += 10;
    
    // Questions in headline
    const isQuestion = headline.includes('?');
    if (isQuestion) score += 10;
    
    // Avoid all caps
    const isAllCaps = headline === headline.toUpperCase() && headline.length > 10;
    if (isAllCaps) score -= 15;
    
    return Math.max(0, Math.min(100, score));
  };

  // Generate meta tags
  const generateMetaTags = (text: string, keywordAnalysis: {word: string, count: number, density: number}[]): MetaTagsType => {
    if (!text || text.trim() === '') {
      return initialMetaTags;
    }
    
    // Extract first line as potential title
    const firstLine = text.split('\n')[0].trim();
    
    // Generate title (use first line or create from keywords)
    let title = firstLine;
    if (!title || title.length > 60) {
      // Create from top keywords if title too long or missing
      const topKeywords = keywordAnalysis.slice(0, 3).map(k => k.word);
      title = topKeywords.join(' ').toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Limit to 60 chars
      if (title.length > 60) {
        title = title.substring(0, 57) + '...';
      }
    }
    
    // Generate description (first 1-2 sentences, limited to 160 chars)
    let description = '';
    const sentences = text.split(/[.!?]+/).filter(Boolean).map(s => s.trim());
    if (sentences.length > 0) {
      description = sentences[0];
      if (sentences.length > 1 && description.length + sentences[1].length < 150) {
        description += '. ' + sentences[1];
      }
      
      // Limit to 160 chars
      if (description.length > 160) {
        description = description.substring(0, 157) + '...';
      }
    }
    
    // Keywords (top 5-7 keywords)
    const keywords = keywordAnalysis.slice(0, 6).map(k => k.word);
    
    return {
      title,
      description,
      keywords
    };
  };

  // Generate recommendations based on analysis
  const generateRecommendations = (
    text: string, 
    scores: ContentScoreType, 
    analysis: ContentAnalysisType
  ): RecommendationType[] => {
    const recs: RecommendationType[] = [];
    
    // Readability recommendations
    if (scores.readability < 60) {
      recs.push({
        id: "read-1",
        category: "readability",
        title: "Improve Sentence Length",
        description: "Your content has several long sentences that may be difficult to read.",
        severity: "medium",
        improvement: "Try breaking longer sentences into shorter ones. Aim for an average of 15-20 words per sentence."
      });
      
      if (analysis.averageWordLength > 5.5) {
        recs.push({
          id: "read-2",
          category: "readability",
          title: "Simplify Your Vocabulary",
          description: "Your content uses complex words that might reduce readability.",
          severity: "medium",
          improvement: "Replace complex words with simpler alternatives where possible."
        });
      }
    }
    
    // Keyword recommendations
    if (scores.keywordDensity < 50) {
      recs.push({
        id: "key-1",
        category: "keywords",
        title: "Low Keyword Density",
        description: "Your content could benefit from more targeted keywords.",
        severity: "high",
        improvement: "Try incorporating more relevant keywords naturally throughout your content. Aim for 1-2% keyword density."
      });
    } else if (scores.keywordDensity > 90) {
      recs.push({
        id: "key-2",
        category: "keywords",
        title: "Keyword Stuffing Detected",
        description: "Your content may have too many instances of certain keywords.",
        severity: "high",
        improvement: "Reduce keyword repetition and focus on more natural language. Search engines may penalize keyword stuffing."
      });
    }
    
    // Structure recommendations
    if (scores.contentStructure < 60) {
      if (analysis.headings.length < 2) {
        recs.push({
          id: "struct-1",
          category: "structure",
          title: "Add More Headings",
          description: "Your content lacks a clear hierarchy of headings.",
          severity: "medium",
          improvement: "Add H2 and H3 headings to break up your content and improve readability and SEO."
        });
      }
      
      if (analysis.paragraphCount < 3) {
        recs.push({
          id: "struct-2",
          category: "structure",
          title: "Improve Paragraph Structure",
          description: "Your content could benefit from better paragraph organization.",
          severity: "medium",
          improvement: "Break your content into more paragraphs. Keep paragraphs to 3-4 sentences for better readability."
        });
      }
    }
    
    // SEO recommendations
    recs.push({
      id: "seo-1",
      category: "seo",
      title: "Meta Description Optimization",
      description: "Adding a compelling meta description will improve click-through rates.",
      severity: "medium",
      improvement: "Create a concise meta description (150-160 characters) that includes your primary keyword."
    });
    
    // Headline recommendations
    if (scores.headlineStrength < 70) {
      recs.push({
        id: "headline-1",
        category: "headline",
        title: "Strengthen Your Headline",
        description: "Your headline could be more compelling.",
        severity: "medium",
        improvement: "Consider adding power words, numbers, or emotional triggers to make your headline more engaging."
      });
    }
    
    // Content length recommendation
    if (analysis.wordCount < 300) {
      recs.push({
        id: "seo-2",
        category: "seo",
        title: "Increase Content Length",
        description: "Your content is shorter than recommended for good SEO performance.",
        severity: "high",
        improvement: "Try to write at least 300-500 words for blog posts, and 1000+ words for comprehensive guides."
      });
    }
    
    // Add meta tag recommendation
    recs.push({
      id: "meta-1",
      category: "meta",
      title: "Implement Generated Meta Tags",
      description: "Using proper meta tags helps search engines understand your content.",
      severity: "medium",
      improvement: "Implement the suggested meta title, description, and keywords in your page's HTML."
    });
    
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
      
      // Text parsing and segmentation
      const words = content.split(/\s+/).filter(Boolean);
      const sentences = content.split(/[.!?]+/).filter(Boolean);
      const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
      
      const wordCount = words.length;
      const sentenceCount = sentences.length;
      const paragraphCount = paragraphs.length;
      
      const averageSentenceLength = sentenceCount ? wordCount / sentenceCount : 0;
      const averageWordLength = words.length ? words.join('').length / words.length : 0;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Average reading speed ~200 wpm
      
      // Calculate scores
      const readabilityScore = calculateReadabilityScore(content);
      
      const keywordAnalysis = analyzeKeywordDensity(content, targetKeywords);
      const keywordDensityScore = keywordAnalysis.score;
      
      const structureAnalysis = analyzeContentStructure(content);
      const contentStructureScore = structureAnalysis.score;
      
      const sentimentAnalysis = analyzeSentiment(content);
      const sentimentScore = sentimentAnalysis.score;
      
      const headlineStrength = analyzeHeadline(content);
      
      // Mock scores for now
      const semanticScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
      const topicRelevance = targetTopic ? Math.floor(Math.random() * 30) + 70 : 50; // 70-100 range if topic set
      
      // SEO score as weighted combination of other factors
      const seoScore = Math.round(
        (readabilityScore * 0.2) +
        (keywordDensityScore * 0.25) +
        (contentStructureScore * 0.2) +
        (headlineStrength * 0.2) +
        (semanticScore * 0.15)
      );
      
      // Overall score as weighted average of all factors
      const overallScore = Math.round(
        (readabilityScore * 0.15) +
        (keywordDensityScore * 0.2) +
        (semanticScore * 0.15) +
        (sentimentScore * 0.1) +
        (headlineStrength * 0.1) +
        (contentStructureScore * 0.15) +
        (topicRelevance * 0.15)
      );
      
      const newScores = {
        overall: overallScore,
        readability: readabilityScore,
        keywordDensity: keywordDensityScore,
        semanticRelevance: semanticScore,
        sentiment: sentimentScore,
        headlineStrength,
        topicRelevance,
        contentStructure: contentStructureScore,
        seoScore,
      };
      
      const newAnalysis = {
        wordCount,
        sentenceCount,
        averageSentenceLength,
        averageWordLength,
        paragraphCount,
        readingTime,
        keywordDensity: keywordAnalysis.analysis,
        topKeywords: keywordAnalysis.topKeywords,
        headings: structureAnalysis.headings,
        sentimentAnalysis: sentimentAnalysis.analysis,
      };
      
      // Generate Meta Tags
      const generatedMetaTags = generateMetaTags(content, keywordAnalysis.topKeywords);
      
      // Historical data (for demo purposes)
      const today = new Date();
      const newHistoricalData = [
        ...historicalData,
        {date: today.toISOString().split('T')[0], score: overallScore}
      ];
      
      // Generate recommendations
      const recs = generateRecommendations(content, newScores, newAnalysis);
      
      // Mock competitor data
      const newCompetitorData = [
        {name: "Competitor A", score: Math.floor(Math.random() * 30) + 50},
        {name: "Competitor B", score: Math.floor(Math.random() * 30) + 50},
        {name: "Competitor C", score: Math.floor(Math.random() * 30) + 50},
      ];
      
      // Update state with all analysis results
      setContentScore(newScores);
      setContentAnalysis(newAnalysis);
      setRecommendations(recs);
      setMetaTags(generatedMetaTags);
      setHistoricalData(newHistoricalData);
      setCompetitorData(newCompetitorData);
      
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
    targetKeywords,
    setTargetKeywords,
    targetTopic,
    setTargetTopic,
    contentScore,
    contentAnalysis,
    recommendations,
    metaTags,
    isAnalyzing,
    analyzeContent,
    historicalData,
    competitorData
  };
};
