import ExportJSONButton from "@/components/ExportJSONButton";
import { buildHanzis } from "../services/util";

const HanziCount = () => {
  const hanzis = buildHanzis();

  const result = true ? hanzis : {};

  return (
    <div>
      <div className="text-4xl font-bold">Hanzi_old Count</div>
      <ExportJSONButton jsonText={JSON.stringify(result)} />
    </div>
  );
};

export default HanziCount;
