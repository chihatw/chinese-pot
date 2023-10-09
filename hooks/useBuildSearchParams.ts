import { buildNewSearchParamsPath, getOriginalPath } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useBuildSearchParams = (input: string, key: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newPath = buildNewSearchParamsPath(
      key,
      input,
      pathname,
      searchParams,
    );

    const originalPath = getOriginalPath(pathname, searchParams);

    if (newPath === originalPath) return;

    // pathが違う場合は、ページを更新
    router.push(newPath);
  }, [input, key, pathname, searchParams, router]);
};

export default useBuildSearchParams;
