
import { analyzeTrend, calculateDifficulty, estimateSearchVolume } from "../../supabase/functions/generate-keywords/keywordUtils";

// Define keyword topics relevant for different industries
const mockKeywordTopics: Record<string, string[]> = {
  "tech": ["software", "app", "cloud", "ai", "web", "data", "mobile", "tech", "tool", "platform"],
  "ecommerce": ["buy", "shop", "deals", "online", "store", "shipping", "review", "price", "discount", "product"],
  "finance": ["bank", "invest", "money", "loan", "credit", "financial", "tax", "insurance", "wealth", "budget"],
  "health": ["health", "medical", "doctor", "wellness", "fitness", "diet", "exercise", "therapy", "clinic", "treatment"],
  "travel": ["travel", "hotel", "flight", "booking", "vacation", "destination", "tour", "trip", "resort", "accommodation"],
  "education": ["course", "learn", "study", "training", "education", "school", "degree", "certificate", "tutorial", "university"],
};

// Create mock ranking URLs for domains
const generateMockUrls = (domain: string, keyword: string): string => {
  const paths = [
    "",
    "blog/",
    "products/",
    "services/",
    "resources/",
    "about/",
  ];
  
  const slug = keyword.toLowerCase().replace(/\s+/g, "-");
  const randomPath = paths[Math.floor(Math.random() * paths.length)];
  
  return `https://${domain}/${randomPath}${slug}`;
};

// Generate mock keywords that a domain might rank for
const generateMockKeywords = (domain: string, country: string, count = 30) => {
  const result = [];
  
  // Determine domain industry by simple heuristic
  let industry = "tech"; // default
  if (domain.includes("shop") || domain.includes("store")) industry = "ecommerce";
  if (domain.includes("bank") || domain.includes("finance")) industry = "finance";
  if (domain.includes("health") || domain.includes("med")) industry = "health";
  if (domain.includes("travel") || domain.includes("tour")) industry = "travel";
  if (domain.includes("edu") || domain.includes("learn")) industry = "education";
  
  const topicKeywords = mockKeywordTopics[industry];
  const domainName = domain.split('.')[0];
  
  // Brand keywords
  const brandKeywords = [
    domainName,
    `${domainName} review`,
    `${domainName} login`,
    `${domainName} vs`,
    `${domainName} pricing`
  ];
  
  // Generate industry-specific keywords
  const industryKeywords = [];
  for (const topic of topicKeywords) {
    industryKeywords.push(
      topic,
      `${topic} ${Math.random() > 0.5 ? "software" : "tool"}`,
      `best ${topic} ${Math.random() > 0.5 ? "solution" : "provider"}`,
      `${topic} for ${Math.random() > 0.5 ? "business" : "enterprise"}`,
      `${topic} ${Math.random() > 0.5 ? "platform" : "service"}`
    );
  }
  
  // Combine and get random sample
  const allKeywords = [...brandKeywords, ...industryKeywords];
  const uniqueKeywords = [...new Set(allKeywords)]; // Remove duplicates
  
  // Select random keywords up to the requested count
  const shuffled = uniqueKeywords.sort(() => 0.5 - Math.random());
  const selectedKeywords = shuffled.slice(0, count);
  
  // Generate keyword data
  for (const keyword of selectedKeywords) {
    // Brand keywords rank higher
    const isBrandKeyword = brandKeywords.includes(keyword);
    
    const position = isBrandKeyword ? 
      Math.floor(Math.random() * 5) + 1 : // 1-5 for brand keywords
      Math.floor(Math.random() * 100) + 1; // 1-100 for other keywords
    
    const volume = estimateSearchVolume(keyword);
    const difficulty = calculateDifficulty(keyword);
    const trend = analyzeTrend(keyword) as "up" | "down" | "stable";
    
    // Generate a last updated date within the last 30 days
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const lastUpdated = new Date(today.setDate(today.getDate() - daysAgo)).toISOString().split('T')[0];
    
    result.push({
      keyword,
      position,
      volume,
      difficulty,
      trend,
      lastUpdated,
      url: generateMockUrls(domain, keyword)
    });
  }
  
  return result;
};

export const analyzeDomain = (domain: string, country: string) => {
  return generateMockKeywords(domain, country);
};
