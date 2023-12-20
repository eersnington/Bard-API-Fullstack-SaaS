"use client";
import React from "react";

const SnippetForm: React.FC = () => {
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

  let resultElement = null;

  if (fetched) {
    resultElement = (
      <div>
        <h2>Snippet</h2>
        <p>{snippet}</p>
        <h2>Keywords</h2>
        <p>{keywords.join(", ")}</p>
      </div>
    );
  }

  return (
    <>
      <h1>Snippet Form</h1>
      <p>
        Tell me what your brand is about and I will generate a branding phrase
        and keywords for you!
      </p>
      <input
        type="text"
        placeholder="Yoga mats"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></input>
      <button onClick={onSubmit}>Generate</button>
      {resultElement}
    </>
  );
};
export default SnippetForm;
