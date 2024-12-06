import React from "react";

type SelectedWord = {
  word: string;
  gapLength: number;
};

interface ClozeSectionProps {
  section: string;
  category: string;
  setClozePoint: (value: string) => void;
  sentence: string;
  preview: string;
  selectedWords: SelectedWord[];
  setSentence: (value: string) => void;
  setSelectedWords: (value: SelectedWord[]) => void;
  setPreview: (value: string) => void;
}

const ClozeSection: React.FC<ClozeSectionProps> = ({
  section,
  category,
  setClozePoint,
  sentence,
  preview,
  selectedWords,
  setSentence,
  setSelectedWords,
  setPreview,
}) => {
  const handleSentenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSentence(e.target.value);
  };

  const handleWordSelection = () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection && sentence.includes(selection)) {
      if (selectedWords.some((sw) => sw.word === selection)) return;
      const gapLength = selection.length;
      const updatedWords = [...selectedWords, { word: selection, gapLength }];
      setSelectedWords(updatedWords);
      const updatedPreview = updatedWords.reduce((prevSentence, sw) => {
        return prevSentence.replace(
          new RegExp(`\\b${sw.word}\\b`, "g"),
          "_".repeat(sw.gapLength)
        );
      }, sentence);
      setPreview(updatedPreview);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedWords = [...selectedWords];
    updatedWords[index] = { word: value, gapLength: value.length };
    setSelectedWords(updatedWords);
    const updatedPreview = updatedWords.reduce((prevSentence, sw) => {
      return prevSentence.replace(
        new RegExp(`\\b${sw.word}\\b`, "g"),
        "_".repeat(sw.gapLength)
      );
    }, sentence);
    setPreview(updatedPreview);
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => setClozePoint(event.target.value)}
          required={true}
        />
      </div>
      <div>
        <div className="mt-3">
          <h1 className="text-1xl font-bold">Preview</h1>
          <input
            type="text"
            value={preview}
            placeholder="Preview"
            className="input input-bordered w-full max-w-full focus:outline-none"
            readOnly
          />
        </div>
        <div className="mt-3">
          <h1 className="text-1xl font-bold">Sentence</h1>
          <input
            type="text"
            value={sentence}
            onChange={handleSentenceChange}
            placeholder="Sentence"
            className="input input-bordered w-full max-w-full focus:outline-none"
            required={true}
          />
        </div>
        <button
          onClick={handleWordSelection}
          className="btn btn-xs btn-outline mt-3"
        >
          Select Word
        </button>
        <div className="mt-5">
          <h1 className="text-1xl font-bold">Selected Words</h1>
          {selectedWords.map((sw, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <input type="checkbox" defaultChecked className="checkbox" />
              <input
                type="text"
                value={sw.word}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClozeSection;
