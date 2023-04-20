import React from "react";

const Alert = ({ title, message, type }) => {
  return (
    <div
      className="flex w-full flex-col h-16 p-2 mb-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
      role="alert"
    >
      <div className="flex">
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <span className="font-medium">{title}</span>
      </div>

      <span className="text-center mb-2">
         {message}
      </span>
    </div>
  );
};

export default Alert;
