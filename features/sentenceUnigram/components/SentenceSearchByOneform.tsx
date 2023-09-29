"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sentence } from "@/features/sentence";
import { ChangeEvent, useState } from "react";
import { getSentenceByformAction } from "../services/actions";

const SentenceSearchByOneform = () => {
  const [value, setValue] = useState({ input: "", form: "" });
  const [result, setResult] = useState<{
    total: number;
    sentences: Sentence[];
  }>({ sentences: [], total: 0 });

  const handleSubmit = async () => {
    const result = await getSentenceByformAction(value.form);
    setResult(result);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const form = input.replace(/[a-zA-Z]/gi, "").at(0) || "";
    setValue({ input, form });
    if (!form) {
      setResult({ sentences: [], total: 0 });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-4xl font-bold">Search By One form</div>

      <Input className="bg-white" value={value.input} onChange={handleChange} />
      <div className="flex items-end gap-2">
        <div className=" grid aspect-square w-10 place-items-center rounded bg-white">
          {value.form}
        </div>
        <form action={handleSubmit}>
          <Button type="submit" disabled={!value.form}>
            送信
          </Button>
        </form>
      </div>
      <div className="space-y-2">
        <div>{`${result.sentences.length} / ${result.total}`}</div>
        {result.sentences.map((sentence) => (
          <div key={sentence.id} className="rounded bg-white p-2 ">
            {sentence.text.split("").map((char, index) => (
              <span
                key={index}
                className={
                  char === value.form ? "text-destructive" : "text-inherit"
                }
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentenceSearchByOneform;
