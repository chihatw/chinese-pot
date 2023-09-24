import { Button } from "@/components/ui/button";
import { setAdminAction } from "../actions";

const SetAdminButton = () => {
  return (
    <form action={setAdminAction}>
      <Button>Set Admin</Button>
    </form>
  );
};

export default SetAdminButton;
