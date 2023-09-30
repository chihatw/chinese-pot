"use client";

import { useToast } from "@/components/ui/use-toast";

import { ARTICLES } from "..";
import ServerActionPendingButton from "../../../components/ServerActionPendingButton";
import { batchAddArticlesAction } from "../services/actions";

const BatchAddArticlesButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddArticlesAction(ARTICLES);
    toast({
      description: `added ${ARTICLES.length} articles`,
    });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Add Articles (${ARTICLES.length})`} />
    </form>
  );
};

export default BatchAddArticlesButton;
