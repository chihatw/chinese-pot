import { PinyinBadge, PinyinFilter } from "@/features/pinyin";

const PinyinFilterMonitor = ({ filter }: { filter: PinyinFilter }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {filter.consonants.map((consonant) => (
        <PinyinBadge
          key={consonant}
          pinyin={{ consonant, tone: "", vowel: "" }}
        />
      ))}
      {filter.vowels.map((vowel) => (
        <PinyinBadge key={vowel} pinyin={{ consonant: "", tone: "", vowel }} />
      ))}
    </div>
  );
};

export default PinyinFilterMonitor;
