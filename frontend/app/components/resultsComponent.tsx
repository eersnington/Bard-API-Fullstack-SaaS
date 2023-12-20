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
  return (
    <>
      <h2>Prompt</h2>
      <p>{props.prompt}</p>
      <h2>Snippet</h2>
      <p>{props.snippet}</p>
      <h2>Keywords</h2>
      {keywordElements}
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default ResultsComponent;
