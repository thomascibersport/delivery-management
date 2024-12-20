import React from "react";

export const Input = ({ id, type = "text", placeholder, ...props }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    {...props}
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);
