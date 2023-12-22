"use client";
import React from "react";
import FormComponent from "./formComponent";
import ResultsComponent from "./resultsComponent";

const Box: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const ENDPOINT: string =
    "https://buzv928rp8.execute-api.ap-south-1.amazonaws.com/prod";

  const onSubmit = () => {
    console.log(`Submitting: ${prompt}`);
    fetch(`${ENDPOINT}/generate_keywords_and_snippet?prompt=${prompt}`).then(
      (res) => {
        res.json().then((data) => {
          onResult(data);
        });
      }
    );
  };

  const onResult = (data: any) => {
    console.log("Received result!");
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setFetched(true);
  };

  const onReset = () => {
    console.log("Resetting!");
    setPrompt("");
    setSnippet("");
    setKeywords([]);
    setFetched(false);
  };

  let displayedElement = null;

  if (fetched) {
    displayedElement = (
      <ResultsComponent
        prompt={prompt}
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
      />
    );
  } else {
    displayedElement = (
      <FormComponent
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <>
      <h1>Snippet Form</h1>
      {displayedElement}
    </>
  );
};
export default Box;
