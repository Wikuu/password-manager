import { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={`bg-gray-50 border border-gray-300 active:bg-gray-100 duration-200 px-8 text-blue-600 py-2 rounded-full w-fit flex justify-center items-center gap-2 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
