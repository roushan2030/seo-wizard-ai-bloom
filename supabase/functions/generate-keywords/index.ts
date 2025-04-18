
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateKeywordData } from './keywordUtils.ts';

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
    
    // Use local keyword generation logic instead of OpenAI
    const keywordData = generateKeywordData(keyword);

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
