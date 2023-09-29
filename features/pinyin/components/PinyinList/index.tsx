import ConsonantList from "./ConsonantList";
import VowelList from "./VowelList";

const PinyinList = () => {
  return (
    <div className="space-y-10">
      <ConsonantList />
      <VowelList />
    </div>
  );
};

export default PinyinList;
