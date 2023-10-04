import ExportJSONButton from "@/components/ExportJSONButton";
import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { SENTENCES } from "@/features/sentenceSeeds";
import { Hanzi_old } from "..";

const HanziCount = () => {
  const sentences = SENTENCES;
  const hanzis: {
    form: string;
    pinyinStr: string;
    sentenceId: string;
  }[] = [];

  for (const sentence of sentences) {
    if (!sentence.text && !sentence.pinyinsStr) continue;

    for (let i = 0; i < sentence.text.split("").length; i++) {
      const form = sentence.text.split("").at(i)!;
      let pinyinStr = sentence.pinyinsStr.split(" ").at(i)!;
      pinyinStr = pinyinStr === "*" ? "" : pinyinStr;
      const hanzi = {
        form,
        pinyinStr,
        sentenceId: sentence.id,
      };
      hanzis.push(hanzi);
    }
  }
  let i = 0;
  const result = hanzis.reduce(
    (acc, cur) => {
      const hanzi: Hanzi_old = {
        id: "",
        form: "",
        pinyin: buildPinyin(""),
      };
      const hanziId = "";
      acc[hanziId] = acc[hanziId]
        ? [...acc[hanziId], cur.sentenceId]
        : [cur.sentenceId];
      return acc;
    },
    {} as { [key: string]: string[] },
  );

  console.log(i);
  // console.log(result);

  return (
    <div>
      <div className="text-4xl font-bold">Hanzi_old Count</div>
      <ExportJSONButton jsonText={JSON.stringify(result)} />
    </div>
  );
};

export default HanziCount;
