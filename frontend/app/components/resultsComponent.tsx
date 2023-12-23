"use client";
import React from "react";

interface ResultsComponentProps {
  prompt: string;
  snippet: string;
  keywords: string[];
  onBack: () => void;
}

const ResultsComponent: React.FC<ResultsComponentProps> = (props) => {
  const keywordElements = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = (
      <div className="bg-amber-400 p-1 px-2 text-sm rounded-md" key={i}>
        #{props.keywords[i]}
      </div>
    );
    keywordElements.push(element);
  }

  const keywordElementsHolder = (
    <div className="flex flex-wrap gap-2">{keywordElements}</div>
  );
  const gradientButtonStyle =
    "w-full p-2 bg-gradient-to-r from-amber-500 to-amber-700";

  const boxStyle =
    "text-gray-800 font-medium bg-white rounded-md w-full my-4 p-2";
  return (
    <>
      <div className={boxStyle}>
        <h2 className="font-semibold mb-2">Prompt</h2>
        <p className="font-bold text-lg">{props.prompt}</p>
      </div>
      <div className={boxStyle}>
        <h2 className="font-semibold mb-2">Snippet</h2>
        <p className="font-bold text-lg">{props.snippet}</p>
      </div>
      <div className={boxStyle}>
        <h2 className="font-semibold mb-2">Keywords</h2>
        {keywordElementsHolder}
      </div>
      <button
        className={
          gradientButtonStyle +
          " rounded-md text-white text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        }
        onClick={props.onBack}
      >
        Back
      </button>
    </>
  );
};

export default ResultsComponent;
