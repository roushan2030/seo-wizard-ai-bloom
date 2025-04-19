
// Keyword generation utilities
export const expandKeywords = (seed: string): string[] => {
  // In a real implementation, this would use NLP algorithms
  // This is a simplified version that demonstrates the concept
  const baseKeywords = seed.toLowerCase().split(/\s+/);
  const expansions: string[] = [...baseKeywords];
  
  // Create combinations of words (simplified semantic analysis)
  baseKeywords.forEach(word => {
    if (word.length > 3) {
      // Add variations
      expansions.push(`best ${word}`);
      expansions.push(`${word} online`);
      expansions.push(`how to ${word}`);
      expansions.push(`${word} guide`);
      expansions.push(`${word} tutorial`);
      // Add long-tail variations
      expansions.push(`best ${word} for beginners`);
      expansions.push(`how to use ${word} effectively`);
      expansions.push(`affordable ${word} solutions`);
    }
  });

  // Combine seed words for more complex phrases (long-tail generation)
  if (baseKeywords.length > 1) {
    for (let i = 0; i < baseKeywords.length - 1; i++) {
      expansions.push(`${baseKeywords[i]} ${baseKeywords[i + 1]} tips`);
      expansions.push(`top ${baseKeywords[i]} ${baseKeywords[i + 1]}`);
    }
  }

  // Filter out duplicates and sort
  return [...new Set(expansions)]
    .filter(kw => kw.length > 2)
    .sort((a, b) => a.localeCompare(b));
};

// Calculate keyword difficulty scores (0-100)
export const calculateDifficulty = (keyword: string): number => {
  // In a real implementation, this would use ML models
  // This is a simplified version for demonstration
  const length = keyword.length;
  const wordCount = keyword.split(' ').length;
  
  // Longer keywords and more words typically have lower difficulty
  let difficulty = 100 - (wordCount * 10);
  // Adjust based on length
  difficulty -= Math.floor(length / 5);
  // Add some randomness
  difficulty += Math.floor(Math.random() * 20) - 10;
  
  // Ensure within bounds
  return Math.max(10, Math.min(100, difficulty));
};

// Estimate search volumes
export const estimateSearchVolume = (keyword: string): number => {
  // In a real implementation, this would use SEO APIs or ML models
  // This is a simplified version for demonstration
  const wordCount = keyword.split(' ').length;
  let baseVolume: number;
  
  // Generally, shorter keywords have higher volume
  if (wordCount === 1) {
    baseVolume = 5000 + Math.floor(Math.random() * 5000);
  } else if (wordCount === 2) {
    baseVolume = 1000 + Math.floor(Math.random() * 4000);
  } else if (wordCount === 3) {
    baseVolume = 500 + Math.floor(Math.random() * 1500);
  } else {
    baseVolume = 100 + Math.floor(Math.random() * 900);
  }
  
  // Round to a nice number
  return Math.floor(baseVolume / 100) * 100;
};

// Estimate CPC values
export const estimateCPC = (keyword: string): number => {
  // In a real implementation, this would use ad platform APIs or ML models
  // This is a simplified version for demonstration
  const wordCount = keyword.split(' ').length;
  const hasHighValue = /buy|purchase|service|professional|best/.test(keyword);
  
  let baseCPC = 0.5 + (Math.random() * 2);
  
  if (hasHighValue) {
    baseCPC += 2 + (Math.random() * 3);
  }
  
  if (wordCount > 2) {
    // Long-tail generally has lower CPC
    baseCPC *= 0.8;
  }
  
  return Number(baseCPC.toFixed(2));
};

// Generate synthetic competitor data for keywords
export const analyzeCompetitors = (keyword: string): string[] => {
  // In a real implementation, this would use SERP APIs
  // This is a simplified demo version
  const competitors = [
    "SEMrush", "Ahrefs", "Moz", "SEO.ai", "WordStream", 
    "HubSpot", "ContentIQ", "KeywordTool", "Google Analytics",
    "WordAI", "MarketMuse", "Clearscope", "TechRadar", "G2", "Capterra"
  ];
  
  // Select 3-5 competitors randomly
  const count = 3 + Math.floor(Math.random() * 3);
  const shuffled = [...competitors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate trending direction
export const analyzeTrend = (keyword: string): "up" | "down" | "stable" => {
  // In a real implementation, this would use historical data
  // This is a simplified version that simulates trends
  const trends: Array<"up" | "down" | "stable"> = ["up", "down", "stable"];
  const isNewTrend = /ai|machine learning|automation|crypto|nft|cloud/.test(keyword.toLowerCase());
  
  if (isNewTrend) {
    // Trending topics more likely to be up
    return Math.random() > 0.3 ? "up" : "stable";
  }
  
  // Random trend for others
  return trends[Math.floor(Math.random() * trends.length)];
};

// Generate relevant keyword data based on search term
export const generateKeywordData = (seedKeyword: string) => {
  const expandedKeywords = expandKeywords(seedKeyword);
  
  return expandedKeywords.map(keyword => ({
    keyword,
    volume: estimateSearchVolume(keyword),
    difficulty: calculateDifficulty(keyword),
    trend: analyzeTrend(keyword),
    cpc: estimateCPC(keyword),
    serp: analyzeCompetitors(keyword)
  }));
};
