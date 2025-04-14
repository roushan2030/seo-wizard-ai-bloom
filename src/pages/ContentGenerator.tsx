
import ContentGeneratorComponent from "@/components/dashboard/ContentGenerator";

const ContentGenerator = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Content Generator</h1>
          <p className="text-gray-500">Create SEO-optimized content with AI assistance</p>
        </div>
      </div>

      <ContentGeneratorComponent />
    </div>
  );
};

export default ContentGenerator;
