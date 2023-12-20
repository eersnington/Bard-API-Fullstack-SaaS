"use client";
import React from "react";

interface FormComponentProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
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
        onChange={(e) => props.setPrompt(e.target.value)}
      ></input>
      <button onClick={props.onSubmit}>Generate</button>
    </>
  );
};

export default FormComponent;
