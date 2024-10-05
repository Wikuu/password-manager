import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props;

  return (
    <input
      className={`${className} bg-gray-100 px-4 py-2 rounded-full text-slate-900 outline-none`}
      {...rest}
    />
  );
};

export default Input;
