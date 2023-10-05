import ExportJSONButton from "@/components/ExportJSONButton";
import { buildHanzis } from "../services/util";

const HanziCount = () => {
  const hanzis = buildHanzis();

  const result = false ? hanzis : {};

  return (
    <div className="space-y-10">
      <div className="text-4xl font-bold">Hanzi Count</div>
      <ExportJSONButton jsonText={JSON.stringify(result)} />
    </div>
  );
};

export default HanziCount;
