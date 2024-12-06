import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

type ComprehensionViewProps = {
  section: string;
  title: string;
  comprehensionQuestions: {
    questionNumber: number;
    type: string;
    point: string;
    title: string;
    options: string[];
  }[];
};

const ComprehensionView = ({
  section,
  title,
  comprehensionQuestions,
}: ComprehensionViewProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );

  const totalPoints = comprehensionQuestions.reduce((sum, question) => {
    const questionPoint = parseInt(question.point, 10);
    return sum + (isNaN(questionPoint) ? 0 : questionPoint);
  }, 0);

  const handleQuestionClick = (questionNumber: number) => {
    setSelectedQuestion((prev) =>
      prev === questionNumber ? null : questionNumber
    );
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOptions.has(option)) {
      setSelectedOptions((prev) => {
        const newSelected = new Set(prev);
        newSelected.delete(option);
        return newSelected;
      });
    } else {
      setSelectedOptions((prev) => new Set(prev).add(option));
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-semibold text-lg text-gray-800">{section}</h4>
        <span className="border rounded px-3 py-1 text-xs bg-gray-100">
          {totalPoints ? `${totalPoints} Points` : "0 Points"}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">{title}</p>
      </div>

      {comprehensionQuestions.map((question) => (
        <div
          key={question.questionNumber}
          className="border border-gray-300 rounded-lg mb-4 p-4"
        >
          <div className="flex justify-between items-center">
            <h5 className="font-semibold text-md text-gray-800">
              {selectedQuestion === question.questionNumber
                ? `${question.title} (Point: ${question.point})`
                : `Question ${question.questionNumber}`}
            </h5>
            <button
              onClick={() => handleQuestionClick(question.questionNumber)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {selectedQuestion === question.questionNumber ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>
          </div>
          {selectedQuestion === question.questionNumber && (
            <div className="mt-4">
              {question.type === "MCQ" || question.type === "MCA" ? (
                <div className="space-y-2">
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`option-${question.questionNumber}-${idx}`}
                        checked={selectedOptions.has(option)}
                        onChange={() => handleOptionSelect(option)}
                        className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`option-${question.questionNumber}-${idx}`}
                        className="text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) : question.type === "Short Text" ? (
                <div>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your answer"
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComprehensionView;
