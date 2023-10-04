import { Hanzi, PinyinHanzi } from "@/features/hanzi";

const SelectedHanzisMonitor = ({
  selectedHanziIds,
  hanzis,
}: {
  selectedHanziIds: string[];
  hanzis: Hanzi[];
}) => {
  return (
    <div className="flex flex-wrap items-end gap-2 px-2">
      {selectedHanziIds.map((hanziId) => {
        const hanzi = hanzis.find((h) => h.id === hanziId);
        if (!hanzi)
          return (
            <div className="text-4xl font-extralight text-gray-500 ">_</div>
          );
        return (
          <div key={hanziId}>
            <PinyinHanzi
              form={hanzi.form}
              pinyinStr={
                hanzi.pinyin.consonant + hanzi.pinyin.vowel + hanzi.pinyin.tone
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default SelectedHanzisMonitor;
