"server only";
import { SentenceTable, getLastTenSentences } from "@/features/sentence";

const RecentSentences = async () => {
  const sentences = await getLastTenSentences();

  return (
    <div className="mx-auto w-full max-w-md pt-10">
      <SentenceTable sentences={sentences} />
    </div>
  );
};

export default RecentSentences;
