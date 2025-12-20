import React from "react";
import type { JSX } from "react/jsx-runtime";

const Cast = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0C2443"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-cast-icon lucide-cast"
    width="2em"
    height="2em"
    {...props}
  >
    <path d="M2 8V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-6M2 12a9 9 0 018 8M2 16a5 5 0 014 4M2 20h.01" />
  </svg>
);

export default Cast;
