import { HTMLAttributes } from "react";

const Card = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, children } = props;

  return (
    <div
      className={`bg-gray-200 p-9 rounded-2xl shadow-lg cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
