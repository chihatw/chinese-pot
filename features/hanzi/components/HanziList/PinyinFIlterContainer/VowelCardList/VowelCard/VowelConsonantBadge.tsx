"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Hanzi } from "@/features/hanzi";
import { getCorrectVowel, getToneCounts } from "@/features/hanzi/services/util";
import { PinyinBadge } from "@/features/pinyin";
import { cn } from "@/lib/utils";

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
        .map(([tone], index) => {
          const currentVowel = getCorrectVowel(
            hanzis[0].pinyin.vowel,
            hanzis[0].pinyin.consonant,
          );
          return (
            <>
              <div key={tone} className="grid grid-cols-[auto_1fr] gap-x-4">
                <div className="grid place-items-center">
                  <PinyinBadge
                    pinyin={{ ...hanzis[0].pinyin, tone, vowel: currentVowel }}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-1">
                  {hanzis
                    .filter((hanzi) => hanzi.pinyin.tone === tone)
                    .map((hanzi) => (
                      <div key={hanzi.id} className="text-sm">
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
