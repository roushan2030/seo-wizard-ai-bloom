
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text, Heading2, Award, AlertTriangle, Info, Clock, CheckCircle, MessageSquare, ListFilter } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HeadlineAnalyzerProps {
  content: string;
  headlineScore: number;
}

const HeadlineAnalyzer: React.FC<HeadlineAnalyzerProps> = ({ content, headlineScore }) => {
  // Extract headline from content (first line)
  const headline = content.split('\n')[0].trim();
  const words = headline.split(/\s+/).filter(Boolean);
  const chars = headline.length;
  
  // Calculate various headline metrics
  const wordCount = words.length;
  const characterCount = chars;
  const hasNumber = /\d+/.test(headline);
  const hasQuestion = headline.includes('?');
  const hasPowerWord = checkForPowerWords(headline);
  const emotionalScore = calculateEmotionalScore(headline);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Determine optimal headline type
  const determineHeadlineType = () => {
    if (hasQuestion) return "Question";
    if (headline.toLowerCase().startsWith("how to")) return "How-to";
    if (/^\d+\s/.test(headline)) return "List";
    if (emotionalScore > 20) return "Emotional";
    return "Standard";
  };
  
  const headlineType = determineHeadlineType();
  
  // Rule-based headline analysis
  const headlineAnalysis = [
    {
      title: "Length",
      icon: <Text className="h-5 w-5 mr-2" />,
      score: wordCount >= 5 && wordCount <= 12 ? 100 : wordCount < 5 ? 50 : Math.max(0, 100 - (wordCount - 12) * 10),
      comment: wordCount >= 5 && wordCount <= 12 
        ? "Optimal headline length (5-12 words)"
        : wordCount < 5 
        ? "Headline may be too short for optimal impact"
        : "Headline is longer than recommended (aim for 5-12 words)"
    },
    {
      title: "Character Count",
      icon: <Clock className="h-5 w-5 mr-2" />,
      score: characterCount <= 60 ? 100 : Math.max(0, 100 - (characterCount - 60)),
      comment: characterCount <= 60 
        ? "Good character count (under 60)"
        : "Headline may be truncated in search results (over 60 characters)"
    },
    {
      title: "Power Words",
      icon: <Award className="h-5 w-5 mr-2" />,
      score: hasPowerWord ? 100 : 50,
      comment: hasPowerWord
        ? "Contains power words that drive engagement"
        : "Consider adding power words like 'proven', 'ultimate', 'essential'"
    },
    {
      title: "Emotional Appeal",
      icon: <MessageSquare className="h-5 w-5 mr-2" />,
      score: emotionalScore,
      comment: emotionalScore >= 70 
        ? "Strong emotional appeal" 
        : emotionalScore >= 40 
        ? "Moderate emotional appeal"
        : "Consider adding emotional words for greater impact"
    },
    {
      title: "Structure",
      icon: <ListFilter className="h-5 w-5 mr-2" />,
      score: (hasNumber || hasQuestion) ? 100 : 60,
      comment: hasNumber && hasQuestion 
        ? "Excellent structure with both numbers and questions" 
        : hasNumber 
        ? "Numbers in headlines typically increase engagement"
        : hasQuestion 
        ? "Questions engage readers effectively"
        : "Consider using numbers or questions to increase engagement"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heading2 className="h-5 w-5 mr-2 text-seo-purple" />
            Headline Analysis
          </CardTitle>
          <CardDescription>
            Optimize your headline for maximum engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!headline ? (
            <div className="text-center py-12 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No headline detected. Add a headline at the beginning of your content.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Current Headline:</h3>
                <p className="text-lg font-bold text-gray-800">{headline}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {wordCount} words
                  </div>
                  <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {characterCount} characters
                  </div>
                  <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {headlineType} type
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-seo-purple" />
                    <h3 className="font-medium">Overall Score</h3>
                  </div>
                  <span className="text-2xl font-bold">{headlineScore}</span>
                </div>
                <Progress value={headlineScore} className={getScoreColor(headlineScore)} />
              </div>
              
              <div className="space-y-3 mt-6">
                {headlineAnalysis.map((analysis, index) => (
                  <div key={index} className="grid grid-cols-3 items-center gap-2">
                    <div className="col-span-2 flex items-center">
                      {analysis.icon}
                      <span>{analysis.title}</span>
                    </div>
                    <div className="text-right">
                      <Progress value={analysis.score} className={getScoreColor(analysis.score)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2 text-seo-purple" />
            Headline Recommendations
          </CardTitle>
          <CardDescription>
            Tips to improve your headline effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!headline ? (
            <div className="text-center py-12 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Add a headline to receive recommendations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {headlineAnalysis.map((analysis, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{analysis.title}</h3>
                    <div className={`text-xs rounded-full px-2 py-0.5 ${
                      analysis.score >= 80 ? "bg-green-100 text-green-800" :
                      analysis.score >= 60 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {analysis.score >= 80 ? "Good" : 
                       analysis.score >= 60 ? "Fair" : "Needs Work"}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{analysis.comment}</p>
                </div>
              ))}
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
                <h3 className="font-medium mb-2 text-blue-800">Headline Formula Tips:</h3>
                <ul className="list-disc ml-5 text-sm text-blue-800 space-y-2">
                  <li>Use numbers (e.g., "7 Ways to..." or "5 Tips for...")</li>
                  <li>Add emotional triggers ("Amazing", "Essential", "Proven")</li>
                  <li>Keep it under 60 characters for better display in search results</li>
                  <li>Include your primary keyword close to the beginning</li>
                  <li>Create a sense of urgency ("Now", "Today", "Before It's Too Late")</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions
function checkForPowerWords(text: string): boolean {
  const powerWords = [
    'free', 'now', 'discover', 'new', 'results', 'guarantee', 'proven', 
    'easy', 'simple', 'how to', 'best', 'ultimate', 'essential', 'secret', 
    'amazing', 'incredible', 'powerful', 'unlock', 'exclusive', 'instantly'
  ];
  
  const textLower = text.toLowerCase();
  return powerWords.some(word => textLower.includes(word));
}

function calculateEmotionalScore(text: string): number {
  const emotionalWords = {
    high: ['amazing', 'incredible', 'breathtaking', 'stunning', 'astonishing', 
           'mind-blowing', 'revolutionary', 'extraordinary', 'sensational'],
    medium: ['great', 'wonderful', 'fantastic', 'remarkable', 'impressive',
             'surprising', 'exciting', 'delightful', 'brilliant'],
    low: ['good', 'nice', 'better', 'useful', 'helpful', 'practical',
          'valuable', 'effective', 'worthy']
  };
  
  const textLower = text.toLowerCase();
  let score = 0;
  
  emotionalWords.high.forEach(word => {
    if (textLower.includes(word)) score += 30;
  });
  
  emotionalWords.medium.forEach(word => {
    if (textLower.includes(word)) score += 20;
  });
  
  emotionalWords.low.forEach(word => {
    if (textLower.includes(word)) score += 10;
  });
  
  return Math.min(100, score);
}

export default HeadlineAnalyzer;
