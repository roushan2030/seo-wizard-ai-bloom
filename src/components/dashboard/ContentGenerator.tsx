
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, RefreshCw, Copy, Download } from "lucide-react";
import { toast } from "sonner";

const ContentGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [contentType, setContentType] = useState("blog-post");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState([500]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = () => {
    if (!prompt) {
      toast.error("Please enter a topic or prompt");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(""); // Clear previous content

    // Simulate API call to OpenAI
    setTimeout(() => {
      // In a real implementation, this would call the OpenAI API
      // Example:
      // const response = await fetch('/api/generate-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     prompt,
      //     keywords,
      //     contentType,
      //     tone,
      //     wordCount: wordCount[0]
      //   })
      // });
      // const data = await response.json();
      // setGeneratedContent(data.content);

      // For now, we'll use a placeholder text
      const sampleContent = `
# ${prompt}

## Introduction

In today's rapidly evolving digital landscape, understanding the nuances of ${prompt.toLowerCase()} has become increasingly important for businesses looking to establish a strong online presence. This comprehensive guide will explore the key aspects of ${prompt.toLowerCase()}, providing actionable insights and strategies for implementation.

## Why ${prompt} Matters

The significance of ${prompt.toLowerCase()} cannot be overstated in the current market environment. As competition intensifies across digital channels, adopting effective ${prompt.toLowerCase()} strategies can provide a substantial competitive advantage. Recent studies indicate that organizations implementing robust ${prompt.toLowerCase()} approaches experience 43% higher engagement rates and 37% improved conversion metrics.

## Key Strategies to Implement

1. **Research and Analysis**: Begin with thorough market research to identify opportunities and gaps.
2. **Strategic Planning**: Develop a comprehensive plan aligning with your overall business objectives.
3. **Implementation**: Execute your strategy with precision, focusing on measurable outcomes.
4. **Monitoring and Optimization**: Continuously track performance and refine your approach based on data.

## Best Practices and Tips

When implementing ${prompt.toLowerCase()}, consider these industry best practices:

- Focus on user experience and engagement
- Leverage data-driven decision making
- Stay updated with industry trends and developments
- Test and iterate your strategies regularly

## Conclusion

Mastering ${prompt.toLowerCase()} is no longer optional but essential for businesses seeking sustained growth in the digital space. By implementing the strategies outlined in this guide, you'll be well-positioned to achieve your objectives and outperform competitors in your market segment.
      `;

      setGeneratedContent(sampleContent);
      setIsGenerating(false);
      toast.success("Content generated successfully!");
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Content copied to clipboard!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">AI Content Generator</CardTitle>
        <CardDescription>
          Create SEO-optimized content powered by advanced AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">Topic or Prompt</label>
            <Textarea 
              placeholder="Describe what you want to write about..." 
              className="min-h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Target Keywords (optional)</label>
            <Input 
              placeholder="Enter keywords separated by commas" 
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Content Type</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog-post">Blog Post</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="product-description">Product Description</SelectItem>
                  <SelectItem value="social-post">Social Media Post</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Word Count: {wordCount[0]}
              </label>
              <Slider 
                defaultValue={wordCount} 
                max={2000} 
                step={100} 
                onValueChange={setWordCount} 
              />
            </div>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            className="bg-seo-purple hover:bg-seo-purple-dark w-full md:w-auto"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </div>
        
        {generatedContent && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Generated Content</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div className="border rounded-md p-4 bg-white min-h-[400px] max-h-[600px] overflow-y-auto">
              <div className="prose max-w-none">
                {generatedContent.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-xl font-semibold mt-4">{line.substring(3)}</h2>;
                  } else if (line.startsWith('- ')) {
                    return <li key={i} className="ml-4">{line.substring(2)}</li>;
                  } else if (line === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i}>{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentGenerator;
