import React from "react";

export const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 ${className}`}
  >
    {children}
  </button>
);
