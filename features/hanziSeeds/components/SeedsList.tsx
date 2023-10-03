"use client";
import {
  MULTI_CHAR_SEEDS,
  ONE_CHAR_MULTI_YOMI,
  ONE_CHAR_ONE_YOMI,
  SEEDS,
} from "..";
const SeedsList = () => {
  return (
    <div className="w-full max-w-md space-y-2">
      <div className="text-4xl font-extrabold">{`SeedsList - ${SEEDS.length}`}</div>
      <div className="space-y-4 px-5">
        <div className="grid grid-cols-[140px_60px]">
          <div className=" text-xl">複詞</div>
          <div className="text-right text-xl">{MULTI_CHAR_SEEDS.length}</div>
          <div className=" text-xl">單詞 破音</div>
          <div className="text-right text-xl">{ONE_CHAR_MULTI_YOMI.length}</div>
          <div className=" text-xl ">單詞 單音 除重</div>
          <div className="text-right text-xl">{ONE_CHAR_ONE_YOMI.length}</div>
        </div>
      </div>
    </div>
  );
};

export default SeedsList;