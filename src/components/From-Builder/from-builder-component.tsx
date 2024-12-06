import { useState } from "react";
import CategorizeComponent from "./categorize-component";
import ClozeSection from "./cloze-component";
import ComprehensionComponent from "./comprehension-component";
import CategorizeView from "../view/categorize-view";
import ClozeComponent from "../view/cloze-view";
import ComprehensionView from "../view/comprehension-view";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { FaAnglesLeft } from "react-icons/fa6";

const FromBuilderComponent = () => {
  const navigate = useNavigate();
  const [sentence, setSentence] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<
    {
      word: string;
      gapLength: number;
    }[]
  >([]);
  const [categories, setCategories] = useState<string[]>([""]);
  const [items, setItems] = useState<{ itemValue: string; belongTo: string }[]>(
    [{ itemValue: "", belongTo: "" }]
  );
  const [categoryPoint, setCategoryPoint] = useState<string>("");
  const [clozePoint, setClozePoint] = useState<string>("");
  const [comprehensionPoint, setComprehensionPoint] = useState<string>("");
  const [comprehensionQuestions, setComprehensionQuestions] = useState<
    {
      questionNumber: number;
      type: string;
      point: string;
      title: string;
      options: string[];
    }[]
  >([]);
  const [comprehensionTitle, setComprehensionTitle] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categorizeData = {
    section: "Section 2",
    category: "Category",
    categories: categories,
    items: items,
    point: categoryPoint,
  };
  const clozeData = {
    section: "Section 1",
    category: "Cloze",
    sentence: sentence,
    preview: preview,
    selectedWords: selectedWords,
    point: clozePoint,
  };
  const comprehensionData = {
    section: "Section 3",
    category: "Comprehension",
    point: comprehensionPoint,
    title: comprehensionTitle,
    comprehensionQuestions: comprehensionQuestions,
  };

  const handleSubmit = async () => {
    const fromBuilderData = {
      categorizeData,
      clozeData,
      comprehensionData,
    };
    try {
      console.log("fromBuilderData", fromBuilderData);
      const response = await fetch(
        "https://form-build-gamma.vercel.app/api/v1/from-builder/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromBuilderData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate("/");
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div>
      <div className="navbar bg-base-300 text-center my-5">
        <Link to="/">
          <h1 className="text-1xl flex items-center gap-2 text-center font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-md px-5 py-1">
            <FaAnglesLeft /> Back
          </h1>
        </Link>
      </div>

      <div className="px-8 py-3">
        <CategorizeComponent
          section="Section 1"
          category="Category"
          setCategoryPoint={setCategoryPoint}
          categories={categories}
          setCategories={setCategories}
          items={items}
          setItems={setItems}
        />
        <ClozeSection
          section="Section 2"
          category="Cloze"
          setClozePoint={setClozePoint}
          sentence={sentence}
          preview={preview}
          selectedWords={selectedWords}
          setSentence={setSentence}
          setSelectedWords={setSelectedWords}
          setPreview={setPreview}
        />
        <ComprehensionComponent
          section="Section 3"
          category="Comprehension"
          setComprehensionTitle={setComprehensionTitle}
          setComprehensionPoint={setComprehensionPoint}
          setQuestions={setComprehensionQuestions}
        />
        <div className="flex gap-4 mt-5">
          <button onClick={handleSubmit} className="btn btn-outline">
            Submit
          </button>
          <button onClick={handlePreview} className="btn btn-primary">
            Preview
          </button>
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[80%] max-h-[80%] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Preview Form Data</h2>
            <div className="space-y-6">
              <div>
                <CategorizeView
                  section="Section 1"
                  category="Categorize the flowing"
                  categories={categories}
                  items={items}
                  point={categoryPoint}
                />
              </div>
              <div>
                <ClozeComponent
                  section="Section 2"
                  preview={preview}
                  selectedWords={selectedWords}
                  point={categoryPoint}
                />
              </div>
              <div>
                <ComprehensionView
                  section="Section 3"
                  title={comprehensionTitle}
                  comprehensionQuestions={comprehensionQuestions}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-outline"
                onClick={() => setIsPreviewOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FromBuilderComponent;
