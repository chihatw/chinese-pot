import { Plus } from "lucide-react";
import Link from "next/link";

const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-lg  space-y-10 pt-10">
      <div className="text-4xl font-extrabold">Article List</div>
      <div className="flex">
        <Link href={"/article/form"}>
          <div className="flex items-center gap-1 rounded bg-primary px-4 py-2 text-white">
            <span>Create New Article</span>
            <Plus size={22} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Loading;
