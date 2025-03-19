"use client";
import React from "react";

const Prompt = ({
  showPrompt,
  message,
  bgColor = "bg-purple-500",
  textColor = "text-white",
}) => {
  return (
    showPrompt && (
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${bgColor} ${textColor} text-sm px-4 py-2 rounded shadow-md z-50 animate-fade-in-out`}
      >
        {message}
      </div>
    )
  );
};

export default Prompt;
