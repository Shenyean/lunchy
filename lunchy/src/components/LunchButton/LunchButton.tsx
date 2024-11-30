import React from "react";
import { LunchButtonProps } from "./LunchButton.types";
import "./LunchButton.css";

const LunchButton: React.FC<LunchButtonProps> = ({ label, onClick }) => {
  return (
    <button className="rounded-button" onClick={onClick}>
      LunchButton
    </button>
  );
};

export default LunchButton;
