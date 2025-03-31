import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface LinkButtonProps {
  children: React.ReactNode;
  to: string;
}

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();
  const className =
    "text-sm cursor-pointer text-blue-500 hover:text-blue-900 hover:underline";

  if (to === "-1") {
    return (
      <button
        className={className}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Volver
      </button>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
