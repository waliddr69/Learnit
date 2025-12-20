import React from "react";
import type { JSX } from "react/jsx-runtime";

const BookSearch = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-book-search-icon lucide-book-search"
    width="2em"
    height="2em"
    {...props}
  >
    <path d="M11 22H5.5a1 1 0 010-5h4.501M21 22l-1.879-1.878" />
    <path d="M3 19.5v-15A2.5 2.5 0 015.5 2H18a1 1 0 011 1v8" />
    <circle cx={17} cy={18} r={3} />
  </svg>
);

export default BookSearch;
