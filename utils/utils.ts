import { ReadonlyURLSearchParams } from "next/navigation";

export const buildNewSearchParamsPath = (
  searchKey: string,
  seachValue: string,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const temp = new URLSearchParams(Array.from(searchParams.entries()));

  if (seachValue) {
    temp.set(searchKey, seachValue);
  } else {
    temp.delete(searchKey);
  }
  const search = temp.toString();
  const query = search ? `?${search}` : "";
  const newPath = `${pathname}${query}`;

  return newPath;
};
