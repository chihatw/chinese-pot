import ConsonantsList from "./ConsonantsList";
import VowelsList from "./VowelsList";

const PinyinList = () => {
  return (
    <div className="space-y-10">
      <div className="text-4xl font-extrabold">Pinyin List</div>
      <ConsonantsList />
      <VowelsList />
    </div>
  );
};

export default PinyinList;
