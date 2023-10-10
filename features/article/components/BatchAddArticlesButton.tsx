"use client";

import { useToast } from "@/components/ui/use-toast";

import ServerActionPendingButton from "../../../components/ServerActionPendingButton";

import { batchAddArticlesAction } from "@/app/_actions";
import ARTICLES_JSON from "../json/ARTICLES.json";
import { Article } from "../schema";

const articles = ARTICLES_JSON as Article[];

const BatchAddArticlesButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddArticlesAction(articles);
    toast({
      description: `added ${articles.length} articles`,
    });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Add Articles (${articles.length})`} />
    </form>
  );
};

export default BatchAddArticlesButton;
