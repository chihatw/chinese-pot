import { buildPitch } from "./buildPitch";
import { divideByMora } from "./divideByMora";

const ACCENT_MARK = "\uff3c";

export const buildPitches = (wordPitchStr: string) => {
  // 全角スペースは空を返す？
  if (!wordPitchStr) return [[""]];

  // アクセントの位置からピッチを計算
  const moras_with_mark = divideByMora(wordPitchStr);

  // 「＼」の位置確認、ない場合は0
  const pitchPoint = Math.max(moras_with_mark.indexOf(ACCENT_MARK), 0);
  // 最後尾が「＼」かどうか
  const isOdaka = moras_with_mark.at(-1) === ACCENT_MARK;

  // 「＼」の削除
  const moras = moras_with_mark.filter((m) => m !== ACCENT_MARK);

  const pitches = moras.map((mora, index) =>
    buildPitch(mora, index, pitchPoint),
  );

  // 尾高の場合、最後に空文字を追加
  if (isOdaka) pitches.push([""]);

  return pitches;
};
