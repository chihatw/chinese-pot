export const buildPitch = (mora: string, index: number, pitchPoint: number) => {
  switch (pitchPoint) {
    // 平板型の場合、先頭以外が高ピッチ
    case 0:
      return index !== 0 ? [mora, "h"] : [mora];
    // 頭高型の場合、先頭だけが高ピッチ
    case 1:
      return index === 0 ? [mora, "h"] : [mora];
    // それ以外は、先頭が低ピッチ、その後はピッチポイントまでが高ピッチ
    default:
      if (index === 0) {
        return [mora];
      } else {
        return index < pitchPoint ? [mora, "h"] : [mora];
      }
  }
};
