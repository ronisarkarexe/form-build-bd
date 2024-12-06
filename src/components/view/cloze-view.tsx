import React, { useRef } from "react";

type ClozeViewProps = {
  section: string;
  preview: string;
  selectedWords: { word: string; gapLength: number }[];
  point: string;
};

const ClozeComponent = ({
  section,
  preview,
  selectedWords,
  point,
}: ClozeViewProps) => {
  const gapsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    word: string
  ) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLSpanElement>,
    gapIndex: number
  ) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");
    if (gapsRef.current[gapIndex]) {
      gapsRef.current[gapIndex]!.textContent = word;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };

  const handleRefresh = () => {
    gapsRef.current.forEach((gap) => {
      if (gap) gap.textContent = "";
    });
  };

  const renderPreview = () => {
    const segments = preview.split(/(_+)/g);

    return segments.map((segment, index) => {
      if (/^_+$/.test(segment)) {
        return (
          <span
            key={`gap-${index}`}
            ref={(el) => (gapsRef.current[index] = el)}
            className="inline-flex items-center justify-center min-w-[50px] px-2 py-1 border-dashed border-2 border-blue-400 bg-blue-50 rounded mx-1"
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
          ></span>
        );
      }
      return (
        <span key={`text-${index}`} className="break-words">
          {segment}
        </span>
      );
    });
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 rounded-md shadow">
      <div className="text-lg font-bold">{section}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="border rounded px-3 py-1 text-xs bg-gray-100">
            {point ? `${point} Points` : "0 Points"}
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-2">
        <strong className="text-gray-700">Preview:</strong>
        <p className="p-3 border rounded border-gray-300 bg-white flex flex-wrap gap-2">
          {renderPreview()}
        </p>
      </div>

      <div className="space-y-2">
        <strong className="text-gray-700">Draggable Words:</strong>
        <div className="flex flex-wrap gap-2">
          {selectedWords.map((wordObj, index) => (
            <div
              key={index}
              className="px-3 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded border border-blue-300 cursor-pointer shadow"
              draggable
              onDragStart={(e) => handleDragStart(e, wordObj.word)}
            >
              {wordObj.word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClozeComponent;
