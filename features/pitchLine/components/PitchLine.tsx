import { checkIsOdaka } from "../services/checkIsOdaka";
import { string2PitchesArray } from "../services/string2PitchesArray";
import MoraCircle from "./MoraCircle";
import MoraString from "./MoraString";
import SVGLine from "./SVGLine";

const WIDTH = 15;

export const PitchLine = ({ pitchString }: { pitchString: string }) => {
  const pitches = string2PitchesArray(pitchString)[0] || [[""]];
  const isOdaka = checkIsOdaka(pitches);
  isOdaka && pitches.pop();

  let lineWidth = pitches.length * WIDTH;
  isOdaka && (lineWidth = +WIDTH);

  return (
    <div className="relative h-10 ">
      <div className="absolute top-0 h-4" style={{ width: lineWidth }}>
        <SVGLine isOdaka={isOdaka} pitches={pitches} width={WIDTH} />
      </div>
      <div className="flex flex-nowrap ">
        {pitches.map((_, index) => (
          <div key={index} className="grid h-10 w-[15px] grid-rows-2 ">
            <MoraCircle index={index} pitches={pitches} />
            <MoraString index={index} pitches={pitches} isOdaka={isOdaka} />
          </div>
        ))}
      </div>
    </div>
  );
};
