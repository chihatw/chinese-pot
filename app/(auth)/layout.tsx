import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid items-center ">
      <div className="mx-auto w-[min(400px,100%-16px)] rounded-lg bg-zinc-100 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
