import React from "react";
import type { JSX } from "react/jsx-runtime";

const ChevronDown = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0c253f"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-down-icon lucide-chevron-down"
    width="1.2em"
    height="2em"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default ChevronDown;
