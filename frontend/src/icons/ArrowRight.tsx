import React from "react";
import type { JSX } from "react/jsx-runtime";

const ArrowRight = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0C2443"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-right-icon lucide-arrow-right"
    width="1.5em"
    height="1.5em"
    {...props}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default ArrowRight;
