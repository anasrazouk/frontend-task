import React from "react";
import "../styles/CustomButtonStyles.css";

type ButtonProps = {
  color: "primary" | "secondary";
  size: "regular" | "small" | "large";
  type? : "submit" 
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};
const CustomButton = ({
  color,
  size,
  icon,
  children,
  type,
  onClick,
}: ButtonProps) => {
  const buttonClass = `button button-${color} button-${size}`;
  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default CustomButton;
