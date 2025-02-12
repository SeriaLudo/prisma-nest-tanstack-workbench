import React from "react";

// 🔹 Text Formatter
export function TextFormatter({ getValue }) {
  return <span className="nowrap">{getValue()}</span>;
}

// 🔹 Number Formatter
export function NumberFormatter({ getValue }) {
  return <span className="w-1">{Number(getValue()).toLocaleString()}</span>;
}

// 🔹 Date Formatter
export function DateFormatter({ getValue }) {
  return <span>{new Date(getValue()).toLocaleDateString()}</span>;
}

// 🔹 Select Formatter
export function SelectFormatter({ getValue }) {
  return <span>{getValue()}</span>;
}
