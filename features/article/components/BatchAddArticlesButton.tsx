"use client";

import ServerActionPendingButton from "../../../components/ServerActionPendingButton";

import { batchAddArticlesAction } from "@/app/_actions";
import ARTICLES_JSON from "../json/ARTICLES.json";
import { Article } from "../schema";

const articles = ARTICLES_JSON as Article[];

const BatchAddArticlesButton = () => {
  const handleSubmit = async () => {
    await batchAddArticlesAction(articles);
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Add Articles (${articles.length})`} />
    </form>
  );
};

export default BatchAddArticlesButton;
