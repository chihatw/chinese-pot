import { Hanzi_old } from "../..";

const MarksMonitor = ({ marks }: { marks: Hanzi_old[] }) => {
  return (
    <div>
      <div className="text-right text-sm font-extralight">
        {`marks: ${marks.length}`}
      </div>
      <div className="flex  justify-end gap-x-1">
        {marks.map((m, index) => (
          <div
            key={index}
            className="rounded bg-white/40 p-1 text-xs font-extralight"
          >
            {m.form}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarksMonitor;
