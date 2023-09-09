import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

const Button: FC<ButtonProps> = ({ children, disabled, onClick, type }) => {
  return (
    <button
      disabled={disabled}
      className="rounded bg-neutral-600 border-2 border-neutral-400 p-2 flex items-center"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
