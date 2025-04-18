
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keyword } = await req.json();
    
    if (!keyword || typeof keyword !== 'string') {
      throw new Error('A valid keyword is required');
    }

    console.log(`Generating keywords for: ${keyword}`);

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not found');
    }

    const prompt = `
      I need a list of keyword suggestions for SEO and content marketing related to: "${keyword}".
      Please provide a comprehensive list of at least 15 related keywords and phrases including:
      - Short-tail keywords (1-2 words)
      - Long-tail keywords (3+ words)
      - Question-based keywords (how, what, why, etc.)
      - Commercial intent keywords (buy, price, etc.)
      - Informational keywords (guide, tutorial, etc.)
      
      Format your response as a JSON array of objects with these properties:
      - keyword (string): The keyword phrase
      - volume (number): Estimated monthly search volume (random between 10-5000)
      - difficulty (number): SEO difficulty score from 0-100
      - trend (string): One of "up", "down", or "stable"
      - cpc (number): Approximate cost-per-click (0.1-10.0)
      - serp (array): Top competitors/websites for this keyword (3-5 names)
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert SEO analyst and keyword researcher.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON from the content string
    let keywordData;
    try {
      // Extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                        content.match(/```\n([\s\S]*?)\n```/);
      
      if (jsonMatch && jsonMatch[1]) {
        keywordData = JSON.parse(jsonMatch[1]);
      } else {
        // Try direct parsing
        keywordData = JSON.parse(content);
      }
    } catch (e) {
      console.error("Failed to parse JSON from OpenAI response:", e);
      console.log("Raw content:", content);
      
      // Fallback: Try to extract any JSON-like array from the content
      const possibleJsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (possibleJsonMatch) {
        try {
          keywordData = JSON.parse(possibleJsonMatch[0]);
        } catch (e2) {
          console.error("Fallback parsing also failed:", e2);
          throw new Error("Could not parse keywords from AI response");
        }
      } else {
        throw new Error("Could not parse keywords from AI response");
      }
    }

    return new Response(
      JSON.stringify({ keywords: keywordData }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("Error in generate-keywords function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
