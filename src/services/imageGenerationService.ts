
export const generateDashboardPreview = async (apiKey: string) => {
  // Validate API key
  if (!apiKey) {
    throw new Error('Runware API key is required');
  }

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          taskType: 'authentication',
          apiKey: apiKey
        },
        {
          taskType: 'imageInference',
          taskUUID: crypto.randomUUID(),
          positivePrompt: "Ultramodern SaaS analytics dashboard with sleek, minimalist design. High-end UI featuring real-time data visualizations, dark theme with gradient accents, clean typography, and 3D charts. Emphasize modern metrics, KPIs, and professional data presentation with blur effects and glass morphism.",
          model: "runware:100@1",
          width: 1200,
          height: 600,
          numberResults: 1,
          outputFormat: "WEBP"
        }
      ])
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    const imageUrl = data.data[1]?.imageURL;
    if (!imageUrl) {
      throw new Error('No image URL found in the response');
    }

    return imageUrl;
  } catch (error) {
    console.error('Image generation error:', error);
    throw error;
  }
};
