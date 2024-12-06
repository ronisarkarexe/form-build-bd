import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

type ComprehensionComponentProps = {
  section: string;
  category: string;
  setComprehensionPoint: (value: string) => void;
  setComprehensionTitle: (value: string) => void;
  setQuestions: React.Dispatch<
    React.SetStateAction<
      {
        questionNumber: number;
        type: string;
        point: string;
        title: string;
        options: string[];
      }[]
    >
  >;
};

const ComprehensionComponent = ({
  section,
  category,
  setComprehensionPoint,
  setComprehensionTitle,
  setQuestions,
}: ComprehensionComponentProps) => {
  const [localQuestions, setLocalQuestions] = useState<
    {
      questionNumber: number;
      type: string;
      point: string;
      title: string;
      options: string[];
    }[]
  >([]);

  const addQuestion = () => {
    const newQuestion = {
      questionNumber: localQuestions.length + 1,
      type: "MCQ",
      point: "",
      title: "",
      options: [""],
    };
    setLocalQuestions([...localQuestions, newQuestion]);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = localQuestions.filter((_, i) => i !== index);
    setLocalQuestions(
      updatedQuestions.map((q, i) => ({ ...q, questionNumber: i + 1 }))
    );
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (
    index: number,
    key: string,
    value: string | string[]
  ) => {
    const updatedQuestions = [...localQuestions];
    updatedQuestions[index] = { ...updatedQuestions[index], [key]: value };
    setLocalQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  const addOption = (index: number) => {
    const updatedQuestions = [...localQuestions];
    updatedQuestions[index].options.push("");
    setLocalQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...localQuestions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setLocalQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="bg-slate-200 p-4 rounded mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">{section}</h1>
        <h1>Type: {category}</h1>
        <input
          type="text"
          placeholder="Point"
          className="input input-bordered input-xs w-full max-w-xs focus:outline-none"
          onChange={(event) => setComprehensionPoint(event.target.value)}
          required={true}
        />
      </div>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Description"
          className="input input-bordered w-full max-w-full focus:outline-none"
          onChange={(event) => setComprehensionTitle(event.target.value)}
          required={true}
        />
      </div>
      <button onClick={addQuestion} className="btn btn-xs mt-5 btn-outline">
        <FaPlus /> Add
      </button>
      <div className="mt-5">
        {localQuestions.map((question, qIndex) => (
          <div key={qIndex} className="bg-gray-100 p-4 rounded mb-4">
            <div className="flex items-center justify-between">
              <span className="font-bold">Q{question.questionNumber}</span>
              <select
                className="select select-bordered w-1/3"
                value={question.type}
                onChange={(e) => updateQuestion(qIndex, "type", e.target.value)}
              >
                <option value="MCQ">MCQ</option>
                <option value="MCA">MCA</option>
                <option value="Short Text">Short Text</option>
              </select>
              <input
                type="text"
                placeholder="Point"
                value={question.point}
                className="input input-bordered w-1/3"
                onChange={(e) =>
                  updateQuestion(qIndex, "point", e.target.value)
                }
              />
              <button
                onClick={() => deleteQuestion(qIndex)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Question Title"
                value={question.title}
                className="input input-bordered w-full"
                onChange={(e) =>
                  updateQuestion(qIndex, "title", e.target.value)
                }
              />
            </div>

            <div className="mt-4">
              {question.type === "MCQ" || question.type === "MCA" ? (
                <div>
                  <h3 className="font-bold mb-2">Options:</h3>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="checkbox mr-2"
                        disabled
                      />
                      <input
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          updateOption(qIndex, oIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(qIndex)}
                    className="btn btn-xs btn-outline"
                  >
                    <FaPlus /> Add
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold mb-2">Answer:</h3>
                  <p className="text-bold">
                    {question.title || "Write the answer here"}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComprehensionComponent;
