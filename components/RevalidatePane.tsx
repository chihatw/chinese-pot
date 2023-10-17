"server only";

import { revalidatePath } from "next/cache";
import ServerActionPendingButton from "./ServerActionPendingButton";

const RevalidatePane = ({
  readTime,
  pathname,
}: {
  readTime: number;
  pathname: string;
}) => {
  const handleSubmit = async () => {
    "use server";
    revalidatePath(pathname);
  };
  return (
    <div className="flex items-center justify-between">
      <form action={handleSubmit}>
        <ServerActionPendingButton label="Revalidate" />
      </form>
      <div className="text-xs font-extralight">{`fetched at ${
        new Date(readTime)
          .toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
          })
          .split(" ")[1]
      }`}</div>
    </div>
  );
};

export default RevalidatePane;
