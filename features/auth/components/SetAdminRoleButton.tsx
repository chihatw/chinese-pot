"server only";
import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { setAdminRole } from "@/firebase/auth";

const UID = process.env.NEXT_PUBLIC_ADMIN_UID as string;

const SetAdminButton = () => {
  const handleSubmit = async () => {
    await setAdminRole(UID);
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Set Admin Role to ${UID} `} />
    </form>
  );
};

export default SetAdminButton;
