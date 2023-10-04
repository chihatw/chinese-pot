"use client";
import { Input } from "@/components/ui/input";
import { Hanzi_old } from "@/features/hanzi";
import { fontSans } from "@/lib/fonts";
import { useState } from "react";
import DifferentConsonants from "./DifferentConsonants";
import DifferentTones from "./DifferentTones";

const FormFilterContainer = ({ hanzis }: { hanzis: Hanzi_old[] }) => {
  const [input, setInput] = useState("");

  const filteredHanzis = hanzis.filter((hanzi) => hanzi.form === input);

  return (
    <div className="space-y-4">
      <div className={`text-4xl font-bold ${fontSans.className}`}>字形篩選</div>
      <Input
        className=" bg-white"
        placeholder="字形篩選"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="space-y-4">
        {filteredHanzis.map((hanzi) => (
          <div key={hanzi.id} className="space-y-2">
            <DifferentTones hanzi={hanzi} />
            <DifferentConsonants hanzi={hanzi} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormFilterContainer;
