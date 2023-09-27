"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Pinyin, PinyinBadge } from "@/features/pinyin";

import { Hanzi } from "../../../../..";
import {
  getConsonantCounts,
  getCorrectVowel,
} from "../../../../../services/util";

const VowelToneBadge = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const hanzi = hanzis.at(0)!;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-x-1">
          <div>
            <PinyinBadge
              pinyin={{
                ...hanzi.pinyin,
                consonant: "",
              }}
            />
            <div>{hanzis.length}</div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-full max-w-md">
        <Content hanzis={hanzis} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default VowelToneBadge;

const Content = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const consonantCounts = getConsonantCounts(hanzis);
  return (
    <div className="max-h-[300px] space-y-2 overflow-y-scroll ">
      {Object.entries(consonantCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([consonant, count], index) => {
          return (
            <>
              <div
                key={consonant}
                className="grid grid-cols-[96px_1fr] gap-x-4"
              >
                <ConsonantCount
                  pinyin={{ ...hanzis[0].pinyin, consonant }}
                  count={count}
                />
                <div className="flex flex-wrap items-center gap-x-2">
                  {hanzis
                    .filter((hanzi) => hanzi.pinyin.consonant === consonant)
                    .map((hanzi) => (
                      <div key={hanzi.id} className="font-extralight">
                        {hanzi.form}
                      </div>
                    ))}
                </div>
              </div>
              {index !== Object.keys(consonantCounts).length - 1 ? (
                <Separator />
              ) : null}
            </>
          );
        })}
    </div>
  );
};

const ConsonantCount = ({
  pinyin,
  count,
}: {
  pinyin: Pinyin;
  count: number;
}) => {
  const correctVowel = getCorrectVowel(pinyin.vowel, pinyin.consonant);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        <PinyinBadge pinyin={{ ...pinyin, vowel: correctVowel }} />
      </div>
      <div className="font-bold">{count}</div>
    </div>
  );
};
