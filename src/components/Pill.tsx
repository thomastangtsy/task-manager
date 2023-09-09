import { FC, ReactNode } from "react";

interface PillProps {
  children?: ReactNode;
}

const Pill: FC<PillProps> = ({ children }) => {
  return (
    <span className="rounded-full bg-white py-0.5 px-1.5 text-sm text-black">
      {children}
    </span>
  );
};

export default Pill;
