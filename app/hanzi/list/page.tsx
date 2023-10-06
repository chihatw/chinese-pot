import { HANZIS, HanziList } from "@/features/hanzi";

const HanziListPage = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <HanziList hanzis={HANZIS} />
    </div>
  );
};

export default HanziListPage;
