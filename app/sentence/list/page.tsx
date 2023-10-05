"server only";
import SentenceTable from "@/features/sentence/components/SentenceTable";
import { getLastTemSentences } from "@/features/sentence/services/firebase";

const SentenceList = async () => {
  const sentences = await getLastTemSentences();

  return (
    <div className="mx-auto w-full max-w-md pt-10">
      <SentenceTable sentences={sentences} />
    </div>
  );
};

export default SentenceList;
