"use client";
import React from "react";
import FormComponent from "./formComponent";
import ResultsComponent from "./resultsComponent";
import Image from "next/image";
import logo from "../../public/logo.png";

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
    if (prompt.length === 0) {
      setPrompt("Yoga mats");
    }
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

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700 w-fit mx-auto";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-gray-900 p-6 rounded-md text-white">
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <Image src={logo} alt="Vercel Logo" width={64} height={64} />
            </div>
            <h1
              className={
                "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700 w-fit mx-auto text-3xl font-semibold py-4"
              }
            >
              Ember AI
            </h1>
            <div className={gradientTextStyle + " font-medium"}>
              Fuel Your Brand&apos;s Fire with Ember AI Assistant
            </div>
          </div>
          {displayedElement}
        </div>
      </div>
    </div>
  );
};
export default Box;
