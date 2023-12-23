"use client";
import React from "react";

interface FormComponentProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  characterLimit: number;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const isPromptTooLong = props.prompt.length > props.characterLimit;

  const updatePrompt = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  return (
    <>
      <p>
        Tell me what your brand is about and I will generate a branding phrase
        and keywords for you!
      </p>
      <input
        type="text"
        placeholder="Yoga mats"
        value={props.prompt}
        onChange={(e) => updatePrompt(e.target.value)}
      ></input>
      <div>
        {props.prompt.length}/{props.characterLimit}
      </div>
      <button
        onClick={props.onSubmit}
        disabled={props.isLoading || isPromptTooLong}
      >
        Generate
      </button>
    </>
  );
};

export default FormComponent;
