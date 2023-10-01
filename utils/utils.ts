import { ReadonlyURLSearchParams } from "next/navigation";

export const buildNewSearchParamsPath = (
  searchKey: string,
  seachValue: string,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
): string => {
  const temp = new URLSearchParams(Array.from(searchParams.entries()));

  if (seachValue) {
    temp.set(searchKey, seachValue);
  } else {
    temp.delete(searchKey);
  }
  const search = temp.toString();
  const query = search ? `?${search}` : "";
  const newPath = `${pathname}${query}`;

  return newPath;
};

// https://stackoverflow.com/questions/55304473/javascript-performance-improvement-to-find-the-common-elements-in-two-array
export const getIntersection = (arrays: string[][]): string[] => {
  // arrays が空の時、処理終了
  if (!arrays.length) {
    return [];
  }

  // array を項数順に並べて、Set にする
  const sets = arrays
    .sort((a, b) => a.length - b.length)
    .map((array) => new Set(array));

  const intersection: string[] = [];

  // 項数が一番少ない set に含まれる項が、他の set にも含まれているかをチェック
  for (const target of sets.at(0)!) {
    // 最初は target がすべての set に含まれると想定
    let all_sets_has_this_target = true;

    // すべても set をチェック
    for (let i = 1; i < sets.length; i++) {
      // set に含まれていない場合は false を設定し、該当 target のチェックは終了
      if (!sets.at(i)!.has(target)) {
        all_sets_has_this_target = false;
        break;
      }
    }

    all_sets_has_this_target && intersection.push(target);
  }

  return intersection;
};
