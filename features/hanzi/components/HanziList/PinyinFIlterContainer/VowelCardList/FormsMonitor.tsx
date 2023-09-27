import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PinyinBadge } from "@/features/pinyin";
import { Hanzi } from "../../../..";

const FormsMonitor = ({ hanzis }: { hanzis: Hanzi[] }) => {
  if (hanzis.length > 50) return null;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,2rem)] gap-1">
      {hanzis.map((hanzi) => (
        <FormPane key={hanzi.id} hanzi={hanzi} />
      ))}
    </div>
  );
};

export default FormsMonitor;

const FormPane = ({ hanzi }: { hanzi: Hanzi }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="grid aspect-square place-items-center rounded bg-white">
          {hanzi.form}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-full max-w-md">
        <PinyinBadge pinyin={hanzi.pinyin} />
      </HoverCardContent>
    </HoverCard>
  );
};
