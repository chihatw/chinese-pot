"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { PinyinBadge, VOWEL_PAIRS } from "@/features/pinyin";

import { Hanzi_old } from "../../../../..";
import {
  getConsonantCounts,
  getCorrectVowel,
} from "../../../../../services/util";

const VowelToneBadge = ({ hanzis }: { hanzis: Hanzi_old[] }) => {
  const hanzi = hanzis.at(0)!;
  // 母音が弱母音の語頭形の場合は、語中形に直す
  const pair_key = Object.keys(VOWEL_PAIRS).find(
    (key) => VOWEL_PAIRS[key] === hanzi.pinyin.vowel,
  );

  if (!!pair_key) {
    hanzi.pinyin.vowel = pair_key;
  }
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

const Content = ({ hanzis }: { hanzis: Hanzi_old[] }) => {
  const consonantCounts = getConsonantCounts(hanzis);
  return (
    <div className="max-h-[300px] space-y-2 overflow-y-scroll ">
      {Object.entries(consonantCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([consonant], index) => {
          const correctVowel = getCorrectVowel(
            hanzis[0].pinyin.vowel,
            hanzis[0].pinyin.consonant,
          );
          return (
            <>
              <div
                key={consonant}
                className="grid grid-cols-[96px_1fr] gap-x-4"
              >
                <div className="flex items-center">
                  <PinyinBadge
                    pinyin={{
                      ...hanzis[0].pinyin,
                      consonant,
                      vowel: correctVowel,
                    }}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-1">
                  {hanzis
                    .filter((hanzi) => hanzi.pinyin.consonant === consonant)
                    .map((hanzi) => (
                      <div key={hanzi.id} className="text-sm">
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
