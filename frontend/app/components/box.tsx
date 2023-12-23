"use client";
import React from "react";
import FormComponent from "./formComponent";
import ResultsComponent from "./resultsComponent";

const Box: React.FC = () => {
  const CHARACTER_LIMIT = 32;
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const ENDPOINT: string =
    "https://buzv928rp8.execute-api.ap-south-1.amazonaws.com/prod";

  const onSubmit = () => {
    console.log(`Submitting: ${prompt}`);
    setIsLoading(true);
    fetch(`${ENDPOINT}/generate_keywords_and_snippet?prompt=${prompt}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            onResult(data);
          });
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          alert("Error: Input character limit exceeded!");
          console.log(err);
        } else {
          alert("Something went wrong!\nPlease try again later.");
          console.log(err);
        }
        onReset();
      });
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
    setIsLoading(false);
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
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }

  return (    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-gray-200 p-6 rounded-md">
          <h1 className="text-3xl">Snippet Form</h1>
          {displayedElement}
        </div>
      </div>
    </div>
  );
};
export default Box;
