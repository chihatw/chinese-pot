export const checkIsOdaka = (pitches: string[][]) => {
  return (
    pitches.length > 1 && // pitchesの長さが1より大きい
    // pitchesの最後から二つ目が高ピッチ
    !!pitches.at(-2)?.at(1) &&
    // pitchesの最後が空文字列
    pitches.at(-1)?.at(0) === ""
  );
};
