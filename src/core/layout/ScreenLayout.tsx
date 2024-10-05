import { ReactNode } from "react";

const ScreenLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="min-h-screen sm:w-full lg:w-4/5 xl:w-3/5 mx-auto p-4 flex flex-col gap-4 items-center">
      {children}
    </div>
  );
};

export default ScreenLayout;
