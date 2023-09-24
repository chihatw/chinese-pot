const YOUONS = "ゃゅょャュョぁぃぅぇぉァィゥェォ".split("");

// 単語のピッチストリングをモーラに分割する
// ピッチマークは残したまま
export const divideByMora = (pitchStr: string): string[] => {
  const moras: string[] = [];
  let totalYouons = 0;
  pitchStr.split("").forEach((char, index) => {
    if (!YOUONS.includes(char)) {
      moras.push(char);
    } else {
      totalYouons++;
      moras[index - totalYouons] = moras[index - totalYouons] + char;
    }
  });
  return moras;
};
