import PinyinBadges from "@/features/pinyin/components/PinyinBadges";

const VowelCount = ({ vowel, count }: { vowel: string; count: number }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="pt-2">
        {vowel === "" ? (
          <p className="flex-1  pl-1">--</p>
        ) : (
          <div className="flex">
            <PinyinBadges pinyin={{ consonant: "", tone: "", vowel }} />
          </div>
        )}
      </div>
      <div className="text-right text-lg font-extrabold">{count}</div>
    </div>
  );
};

export default VowelCount;
