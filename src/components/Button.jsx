import React from "react";

export default function Button({ bgColor, text, onClick }) {
  const baseClasses =
    "focus:outline-none text-white hover:bg-opacity-90 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2  transition-colors duration-300";

  const buttonClasses = `${baseClasses} ${bgColor}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {text}
    </button>
  );
}
