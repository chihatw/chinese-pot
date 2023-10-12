import Image from "next/image";

// https://stackoverflow.com/questions/71617582/i-am-getting-the-error-the-requested-resource-isnt-a-valid-image-for-public-l
const OutlinePage = () => {
  return (
    <div className="mx-auto w-[min(100ch,100%-80px)] space-y-10 pb-40 pt-10">
      <div className="relative aspect-[1079/525] ">
        <Image
          src="/routes.png"
          alt="routes"
          style={{ objectFit: "contain" }}
          fill
        />
      </div>
      <div className="relative aspect-[1068/777] ">
        <Image
          src="/data_structure.png"
          alt="routes"
          style={{ objectFit: "contain" }}
          fill
        />
      </div>
    </div>
  );
};

export default OutlinePage;
