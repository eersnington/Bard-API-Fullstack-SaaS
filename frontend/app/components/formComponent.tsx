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
  const isPromptMax = props.prompt.length >= props.characterLimit;
  const statusTextColor = isPromptMax ? "text-red-500" : "text-slate-500";

  const updatePrompt = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  const gradientButtonStyle =
    "w-full p-2 bg-gradient-to-r from-amber-500 to-amber-700";

  return (
    <>
      <p className="mb-6">
        Tell me what your brand is about and I will generate a branding phrase
        and keywords for you!
      </p>
      <input
        className="p-2 w-full rounded-md focus:outline-amber-500 focus:outline text-slate-800"
        type="text"
        placeholder="Yoga mats"
        value={props.prompt}
        onChange={(e) => updatePrompt(e.target.value)}
      ></input>
      <div className={statusTextColor + " text-right my-2"}>
        {props.prompt.length}/{props.characterLimit}
      </div>
      <button
        className={
          gradientButtonStyle +
          " rounded-md text-white text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        }
        onClick={props.onSubmit}
        disabled={props.isLoading}
      >
        Generate
      </button>
    </>
  );
};

export default FormComponent;
