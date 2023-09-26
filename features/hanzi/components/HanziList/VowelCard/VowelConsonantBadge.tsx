"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Pinyin, PinyinBadge } from "@/features/pinyin";
import { cn } from "@/lib/utils";
import { Hanzi } from "../../..";
import { getCorrectVowel, getToneCounts } from "../../../services/util";

const VowelConsonantBadge = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const hanzi = hanzis[0];
  const vowel = getCorrectVowel(hanzi.pinyin.vowel, hanzi.pinyin.consonant);
  const toneCounts = getToneCounts(hanzis);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-x-1">
          <div>
            <PinyinBadge
              pinyin={{
                vowel,
                consonant: hanzi.pinyin.consonant,
                tone: "",
              }}
            />
            <div
              className={cn(
                Object.keys(toneCounts).length === 1 && hanzis.length > 1
                  ? "text-destructive"
                  : "",
                Object.keys(toneCounts).length === 2 && hanzis.length > 2
                  ? "text-blue-600"
                  : "",
                Object.keys(toneCounts).length === 3 && hanzis.length > 3
                  ? "text-amber-600"
                  : "",
              )}
            >
              {hanzis.length}
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-full max-w-md">
        <Content hanzis={hanzis} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default VowelConsonantBadge;

const Content = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const toneCounts = getToneCounts(hanzis);
  return (
    <div className="space-y-2">
      {Object.entries(toneCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([tone, count], index) => {
          return (
            <>
              <div key={tone} className="grid grid-cols-[auto_1fr] gap-x-4">
                <ToneCount
                  pinyin={{ ...hanzis[0].pinyin, tone }}
                  count={count}
                />
                <div className="flex flex-wrap items-center gap-x-2">
                  {hanzis
                    .filter((hanzi) => hanzi.pinyin.tone === tone)
                    .map((hanzi) => (
                      <div key={hanzi.id} className="font-extralight">
                        {hanzi.form}
                      </div>
                    ))}
                </div>
              </div>
              {index !== Object.keys(toneCounts).length - 1 ? (
                <Separator />
              ) : null}
            </>
          );
        })}
    </div>
  );
};

const ToneCount = ({ pinyin, count }: { pinyin: Pinyin; count: number }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        <PinyinBadge pinyin={pinyin} />
      </div>
      <div className="font-bold">{count}</div>
    </div>
  );
};
