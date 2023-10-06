"use client";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

const CreateArticleButton = () => {
  return (
    <Button className="space-x-1">
      <span>Create New Article</span>
      <Plus size={20} />
    </Button>
  );
};

export default CreateArticleButton;
