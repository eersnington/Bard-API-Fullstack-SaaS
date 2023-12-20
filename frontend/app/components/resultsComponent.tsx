"use client";
import React from "react";

interface ResultsComponentProps {
  snippet: string;
  keywords: string[];
  onBack: () => void;
}

const ResultsComponent: React.FC<ResultsComponentProps> = (props) => {
  return (
    <>
      <h2>Snippet</h2>
      <p>{props.snippet}</p>
      <h2>Keywords</h2>
      <p>{props.keywords.join(", ")}</p>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default ResultsComponent;
