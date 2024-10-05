import { HTMLAttributes } from "react";

const Typography = (props: HTMLAttributes<HTMLParagraphElement>) => {
  const { children, className, ...rest } = props;

  return (
    <p className={`text-slate-900 ${className}`} {...rest}>
      {children}
    </p>
  );
};

export default Typography;
