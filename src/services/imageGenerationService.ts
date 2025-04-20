
export const generateDashboardPreview = async (apiKey: string) => {
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
        positivePrompt: "Minimalist modern SEO analytics dashboard, showing graphs, charts and statistics in a clean design. Professional UI with purple and white color scheme, dark mode interface with data visualizations.",
        model: "runware:100@1",
        width: 1200,
        height: 600,
        numberResults: 1,
        outputFormat: "WEBP"
      }
    ])
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.data[1]?.imageURL;
};
