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
    const element = <div key={i}>#{props.keywords[i]}</div>;
    keywordElements.push(element);
  }
  const gradientButtonStyle =
    "w-full p-2 bg-gradient-to-r from-amber-500 to-amber-700";

  return (
    <div className="my-2 py-4">
      <h2 className="font-semibold">Prompt</h2>
      <p>{props.prompt}</p>
      <h2 className="font-semibold">Snippet</h2>
      <p>{props.snippet}</p>
      <h2 className="font-semibold">Keywords</h2>
      {keywordElements}
      <button
        className={
          gradientButtonStyle +
          " rounded-md text-white text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        }
        onClick={props.onBack}
      >
        Back
      </button>
    </div>
  );
};

export default ResultsComponent;
