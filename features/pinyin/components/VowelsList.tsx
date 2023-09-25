import { Badge } from "@/components/ui/badge";
import { HALF_VOWELS, MAJOR_FULL_VOWELS, MINOR_FULL_VOWELS, VOWELS } from "..";
import { pinyinColor } from "../services/pinyinColor";

const VowelsList = () => {
  return (
    <div className="grid max-w-md gap-y-5">
      <div className="text-4xl font-extrabold">Vowels</div>
      <div>
        <div className="text-xl font-extrabold">{`Major Full Vowels - ${MAJOR_FULL_VOWELS.length}`}</div>
        <div>
          {MAJOR_FULL_VOWELS.filter((vowel) => vowel.at(0) === "a").map(
            (vowel) => (
              <Badge
                key={vowel}
                variant="outline"
                className={pinyinColor(vowel)}
              >
                {vowel}
              </Badge>
            ),
          )}
        </div>
        <div>
          {MAJOR_FULL_VOWELS.filter((vowel) => vowel.at(0) === "o").map(
            (vowel) => (
              <Badge
                key={vowel}
                variant="outline"
                className={pinyinColor(vowel)}
              >
                {vowel}
              </Badge>
            ),
          )}
        </div>
        <div>
          {MAJOR_FULL_VOWELS.filter((vowel) => vowel.at(0) === "e").map(
            (vowel) => (
              <Badge
                key={vowel}
                variant="outline"
                className={pinyinColor(vowel)}
              >
                {vowel}
              </Badge>
            ),
          )}
        </div>
      </div>
      <div>
        <div className="text-xl font-extrabold">{`Minor Full Vowels - ${MINOR_FULL_VOWELS.length}`}</div>

        <div>
          {MINOR_FULL_VOWELS.filter((vowel) => vowel.at(0) === "v").map(
            (vowel) => (
              <Badge
                key={vowel}
                variant="outline"
                className={pinyinColor(vowel)}
              >
                {vowel}
              </Badge>
            ),
          )}
        </div>
        <div>
          {MINOR_FULL_VOWELS.filter((vowel) => vowel.at(0) === "i").map(
            (vowel) => (
              <Badge
                key={vowel}
                variant="outline"
                className={pinyinColor(vowel)}
              >
                {vowel}
              </Badge>
            ),
          )}
        </div>
        <div>
          {MINOR_FULL_VOWELS.filter((vowel) => vowel.at(0) === "u").map(
            (vowel) => (
              <Badge
                key={vowel}
                variant="outline"
                className={pinyinColor(vowel)}
              >
                {vowel}
              </Badge>
            ),
          )}
        </div>
      </div>
      <div>
        <div className="text-xl font-extrabold">{`Half Vowels - ${HALF_VOWELS.length}`}</div>
        <div>
          {HALF_VOWELS.filter((vowel) => vowel.at(0) === "y").map((vowel) => (
            <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
              {vowel}
            </Badge>
          ))}
        </div>
        <div>
          {HALF_VOWELS.filter((vowel) => vowel.at(0) === "w").map((vowel) => (
            <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
              {vowel}
            </Badge>
          ))}
        </div>
        {/* <div>
          {HALF_VOWELS.map((vowel) => (
            <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
              {vowel}
            </Badge>
          ))}
        </div> */}
      </div>
      <div>
        <div className="text-xl font-extrabold">{`Vowels - ${VOWELS.length}`}</div>
        <div>
          {VOWELS.map((vowel) => (
            <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
              {vowel}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VowelsList;
