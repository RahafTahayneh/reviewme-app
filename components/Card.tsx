import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  children: ReactNode;
};
const Card = ({ className, children }: Props) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
