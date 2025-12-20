import React from "react";
import type { JSX } from "react/jsx-runtime";

const Menu = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-menu-icon lucide-menu"
    width="2em"
    height="1.5em"
    {...props}
  >
    <path d="M4 5h16M4 12h16M4 19h16" />
  </svg>
);

export default Menu;
