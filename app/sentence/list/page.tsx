"server only";
import SentenceTable from "@/features/sentence/components/SentenceTable";
import { getLastTenSentences } from "@/features/sentence/services/firestore_restapi";

const SentenceList = async () => {
  const sentences = await getLastTenSentences();

  return (
    <div className="mx-auto w-full max-w-md pt-10">
      <SentenceTable sentences={sentences} />
    </div>
  );
};

export default SentenceList;
