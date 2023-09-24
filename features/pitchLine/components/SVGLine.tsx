const SVGLine = ({
  isOdaka,
  pitches,
  width,
}: {
  isOdaka: boolean;
  pitches: string[][];
  width: number;
}) => {
  const { points, odakaLastPoint } = buildPoints(pitches, width);
  return (
    <svg className="inset-0">
      <polyline className="stroke-main fill-none stroke-2" points={points} />
      {isOdaka && (
        <polyline
          className="stroke-main fill-none stroke-[3px]"
          strokeDasharray="2 2"
          strokeDashoffset="1"
          points={odakaLastPoint}
        />
      )}
    </svg>
  );
};

export default SVGLine;

const HIGH_POSITION = 7.8;
const LOW_POSITION = 17;

const buildPoints = (pitches: string[][], width: number) => {
  const points: number[] = [];

  pitches.forEach((pitch, index) => {
    points.push(width * (1 / 2 + index));
    points.push(!!pitch.at(1) ? HIGH_POSITION : LOW_POSITION);
  });

  const lastXPos = width * (pitches.length - 1 / 2);

  return {
    points: points.join(","),
    odakaLastPoint: [
      lastXPos,
      HIGH_POSITION,
      lastXPos + width,
      LOW_POSITION,
    ].join(","),
  };
};
