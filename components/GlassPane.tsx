import { ReactNode } from "react";
import "@/styles/global.css";
import clsx from "clsx";

interface Props {
  children?: ReactNode;
  className?: string;
}

const GlassPane = ({ className, children }: Props) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
