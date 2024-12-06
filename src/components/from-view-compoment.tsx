import { useEffect, useState } from "react";
import CategorizeView from "./view/categorize-view";
import ClozeComponent from "./view/cloze-view";
import ComprehensionView from "./view/comprehension-view";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface ItemData {
  categorizeData: CategorizeData;
  clozeData: ClozeData;
  comprehensionData: ComprehensionData;
}

interface CategorizeData {
  section: string;
  category: string;
  categories: string[];
  items: Item[];
  point: string;
}

interface Item {
  itemValue: string;
  belongTo: string;
  _id: string;
}

interface ClozeData {
  section: string;
  category: string;
  sentence: string;
  preview: string;
  selectedWords: SelectedWord[];
  point: string;
}

interface SelectedWord {
  word: string;
  gapLength: number;
  _id: string;
}

interface ComprehensionData {
  section: string;
  category: string;
  point: string;
  title: string;
  comprehensionQuestions: ComprehensionQuestion[];
}

interface ComprehensionQuestion {
  questionNumber: number;
  type: string;
  point: string;
  title: string;
  options: string[];
  _id: string;
}

const FromViewComponent = () => {
  const [data, setData] = useState<ItemData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const handleSectionClick = (index: number) => {
    setSelectedSection((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://form-build-gamma.vercel.app/api/v1/from-builder"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-5">
      <h1 className="font-semibold text-lg text-gray-800 mb-5">
        Form Data Details
      </h1>
      {data.map((item, index) => (
        <div key={index} className="mb-5 border-2 border-gray-300 p-3">
          <div className="flex justify-between items-center">
            <h5 className="font-semibold text-md text-gray-800">
              {"From" + " " + (index + 1)}
            </h5>
            <button
              onClick={() => handleSectionClick(index)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {selectedSection === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {selectedSection === index && (
            <div className="mt-3 space-y-5">
              <CategorizeView
                section={item.categorizeData.section}
                category={item.categorizeData.category}
                categories={item.categorizeData.categories}
                items={item.categorizeData.items}
                point={item.categorizeData.point}
              />
              <ClozeComponent
                section={item.clozeData.section}
                preview={item.clozeData.preview}
                selectedWords={item.clozeData.selectedWords}
                point={item.clozeData.point}
              />
              <ComprehensionView
                section={item.comprehensionData.section}
                title={item.comprehensionData.title}
                comprehensionQuestions={
                  item.comprehensionData.comprehensionQuestions
                }
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FromViewComponent;
