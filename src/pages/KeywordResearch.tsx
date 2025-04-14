
import KeywordResearchComponent from "@/components/dashboard/KeywordResearch";

const KeywordResearch = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Keyword Research</h1>
          <p className="text-gray-500">Discover high-performing keywords for your content</p>
        </div>
      </div>

      <KeywordResearchComponent />
    </div>
  );
};

export default KeywordResearch;
