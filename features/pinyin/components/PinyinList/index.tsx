import ConsonantList from "./ConsonantList";
import VowelList from "./VowelList";

const PinyinList = () => {
  return (
    <div className="mx-auto max-w-md space-y-10">
      <ConsonantList />
      <VowelList />
    </div>
  );
};

export default PinyinList;
