"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ARTICLES } from "..";
import { batchAddArticlesAction } from "../services/actions";

const BatchAddArticlesButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await batchAddArticlesAction(ARTICLES);
    setIsLoading(false);
    toast({
      description: `added ${ARTICLES.length} articles`,
    });
  };

  return (
    <form action={handleSubmit}>
      <Button type="submit" disabled={isLoading}>
        <div className="flex items-center gap-2">
          {`Add Articles (${ARTICLES.length})`}
          {isLoading ? <Loader2 className="animate-spin" /> : null}
        </div>
      </Button>
    </form>
  );
};

export default BatchAddArticlesButton;
