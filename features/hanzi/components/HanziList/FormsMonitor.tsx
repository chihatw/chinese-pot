"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PinyinBadge } from "@/features/pinyin";
import { cn } from "@/lib/utils";
import { Hanzi } from "../..";
import { buildFormUniqHanzis } from "../../services/util";

const FormsMonitor = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const hanzis_uniq = buildFormUniqHanzis(hanzis);

  if (hanzis.length > 50) return null;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,2rem)] gap-1">
      {hanzis_uniq.map((hanzi) => (
        <FormPane key={hanzi.id} hanzi={hanzi} hanzis={hanzis} />
      ))}
    </div>
  );
};

export default FormsMonitor;

const FormPane = ({ hanzi, hanzis }: { hanzi: Hanzi; hanzis: Hanzi[] }) => {
  const sameForms = hanzis.filter((_hanzi) => _hanzi.form === hanzi.form);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "grid aspect-square place-items-center rounded  bg-white",
            sameForms.length > 1 ? "text-destructive" : "text-inherit",
          )}
        >
          {hanzi.form}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-full max-w-md">
        <div className="space-y-1">
          {sameForms.map((hanzi) => (
            <PinyinBadge pinyin={hanzi.pinyin} key={hanzi.id} />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
