import React from "react";

export default function InputTag({
  label,
  id,
  value,
  readOnly,
  onChange,
  ...props
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className=" ml-1 ">
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        {...props} // This will pass any additional props to the input element
        className={`py-1 px-2 font-semibold rounded-full border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300 ${props.className}`}
      />
    </div>
  );
}
