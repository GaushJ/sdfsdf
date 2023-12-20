import React from "react";

interface Props {
  className: any;
}

export const MenuCloseMd1 = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 18L6 6" stroke="#141527" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M18 6L6 18" stroke="#141527" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
};
