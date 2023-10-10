"use client";

import { addArticleAction, updateArticleAction } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Article } from "../schema";

const ArticleForm = ({ article }: { article?: Article }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [value, setValue] = useState<{ title: string; date?: Date }>({
    title: article?.title || "",
    date: article ? new Date(article.createdAt) : new Date(),
  });

  const handleSubmit = async () => {
    if (article) {
      updateArticle(article.id, value.title, value.date!.getTime());
    } else {
      createArticle(value.title, value.date!);
    }
  };

  const createArticle = async (title: string, date: Date) => {
    const article: Article = {
      id: nanoid(),
      title,
      createdAt: date.getTime(),
      sentenceIds: [],
    };
    await addArticleAction(article);
  };

  const updateArticle = async (
    id: string,
    title: string,
    createdAt: number,
  ) => {
    await updateArticleAction(id, title, createdAt);
    toast({ description: `updated article!` });
  };

  return (
    <div className="grid gap-10">
      <Input
        className="bg-white"
        placeholder="title"
        value={value.title}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Popover>
        <PopoverTrigger>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start bg-white text-left font-normal",
              !value.date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value.date ? (
              format(value.date, "yyyy/MM/dd")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value.date}
            onSelect={(date) => setValue((prev) => ({ ...prev, date }))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <form action={handleSubmit}>
        <Button
          type="submit"
          disabled={!value.title || !value.date}
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ArticleForm;
