import { Button } from "@/components/ui/button";
import { signInAppWithGoogle } from "@/features/auth/services/auth";
import { ReactNode, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton = ({ children }: { children: ReactNode }) => {
  const [openOverlay, setOpenOverlay] = useState(false);
  const loginWithGoogle = () => {
    try {
      setOpenOverlay(true);
      signInAppWithGoogle();
    } catch (e) {
      console.log(e);
      setOpenOverlay(false);
    }
  };
  return (
    <>
      <Button
        className="w-full bg-main  hover:bg-main-300 active:bg-main-600"
        onClick={loginWithGoogle}
      >
        {children}
      </Button>
      {openOverlay ? (
        <div className="fixed inset-0 z-50 grid place-content-center backdrop-blur-sm">
          <FaGoogle className="text-[120px]" />
        </div>
      ) : null}
    </>
  );
};

export default GoogleSignInButton;
