"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Hanzi, PinyinHanzi } from "@/features/hanzi";

import { PinyinBadge, buildPinyin, getPinyinStr } from "@/features/pinyin";
import { Sentence, SentenceLine } from "@/features/sentence";
import { getSentence_client } from "@/features/sentence/services/firebase_client";
import { buildHanzisGroupedByConsonantVowel } from "@/features/sentence/services/utils";
import { useEffect, useState } from "react";

const HanziList = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const items = buildHanzisGroupedByConsonantVowel(hanzis);
  // グループに含まれる hanzi が多い順に並べる
  const orderdItems = items.sort((a, b) => b.hanzis.length - a.hanzis.length);
  return (
    <div className="space-y-4 overflow-y-scroll">
      {orderdItems.map((item, index) => {
        // 四声順に並べる
        const orderedHanzis = item.hanzis.sort(
          (a, b) => parseInt(a.pinyin.tone) - parseInt(b.pinyin.tone),
        );
        return (
          <div key={index} className="flex items-center gap-2">
            <PinyinBadge pinyin={buildPinyin(item.consonant + item.vowel)} />
            <div className="flex flex-wrap gap-2">
              {orderedHanzis.map((hanzi) => (
                <PinyinHanziHoverCard hanzi={hanzi} key={hanzi.id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HanziList;

const PinyinHanziHoverCard = ({ hanzi }: { hanzi: Hanzi }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <PinyinHanzi
            key={hanzi.id}
            form={hanzi.form}
            pinyinStr={getPinyinStr(hanzi.pinyin)}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <PinyinHanziHoverCardContent hanzi={hanzi} />
      </HoverCardContent>
    </HoverCard>
  );
};

const PinyinHanziHoverCardContent = ({ hanzi }: { hanzi: Hanzi }) => {
  const [sentence, setSentence] = useState<Sentence | undefined>(undefined);
  useEffect(() => {
    if (!hanzi.latestSentenceId) {
      setSentence(undefined);
      return;
    }
    const fetchData = async () => {
      const sentence = await getSentence_client(hanzi.latestSentenceId);
      if (!sentence) return;
      setSentence(sentence);
    };
    fetchData();
  }, [hanzi]);
  if (!sentence) return null;
  return <SentenceLine sentence={sentence} />;
};
