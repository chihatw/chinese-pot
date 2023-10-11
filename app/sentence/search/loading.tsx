import { SearchSentencesByForms } from "@/features/invertedIndex";

const Loading = async () => {
  return (
    <div className="mx-auto w-full max-w-md pt-10">
      <SearchSentencesByForms forms={""} />
    </div>
  );
};

export default Loading;
