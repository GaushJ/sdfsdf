import React from "react";

interface Props {
  className: any;
}

export const MenuCloseMd = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 18L6 6" stroke="#14181F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M18 6L5.99997 18" stroke="#14181F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
};
