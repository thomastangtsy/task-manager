import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

const Button: FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button
      type={type}
      className="rounded bg-neutral-600 p-2 flex items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
