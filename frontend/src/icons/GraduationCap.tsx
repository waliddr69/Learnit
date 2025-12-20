import React from "react";
import type { JSX } from "react/jsx-runtime";

const GraduationCap = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0C2443"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-graduation-cap-icon lucide-graduation-cap"
    width="2em"
    height="2em"
    {...props}
  >
    <path d="M21.42 10.922a1 1 0 00-.019-1.838L12.83 5.18a2 2 0 00-1.66 0L2.6 9.08a1 1 0 000 1.832l8.57 3.908a2 2 0 001.66 0zM22 10v6" />
    <path d="M6 12.5V16a6 3 0 0012 0v-3.5" />
  </svg>
);

export default GraduationCap;
