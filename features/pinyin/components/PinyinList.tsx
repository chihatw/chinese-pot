import ConsonantsList from "./ConsonantsList";
import PinyinForm from "./PinyinForm";
import VowelsList from "./VowelsList";

const PinyinList = () => {
  return (
    <div className="space-y-10">
      <PinyinForm />
      <ConsonantsList />
      <VowelsList />
    </div>
  );
};

export default PinyinList;
