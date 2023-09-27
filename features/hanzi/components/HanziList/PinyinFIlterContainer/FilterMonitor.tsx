import { PinyinBadge, PinyinFilter } from "@/features/pinyin";

const FilterMonitor = ({ filter }: { filter: PinyinFilter }) => {
  return (
    <div className="flex gap-x-1">
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

export default FilterMonitor;
