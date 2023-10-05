import { Hanzi_old } from "../hanzi";
import SeedsList from "./components/SeedsList";
import HANZIS_JSON from "./hanzis.json";
import SEEDJSON from "./lang-pot.midashi_zhs.json";
import ONEYOMI from "./one_yomi.json";
import { Seed, SimpleSeed } from "./schema";

const SEEDS = SEEDJSON as unknown as Seed[];

const MULTI_CHAR_SEEDS = SEEDS.filter((seed) => seed.midashi.length > 1);

const ONE_CHAR_MULTI_YOMI = SEEDS.filter(
  (seed) => seed.midashi.length === 1,
).filter((seed) => seed.yomis.length > 1);

const ONE_CHAR_ONE_YOMI = ONEYOMI as unknown as SimpleSeed[];

const HANZIS_OLD = HANZIS_JSON as unknown as Omit<Hanzi_old, "id">[];

export {
  HANZIS_OLD,
  MULTI_CHAR_SEEDS,
  ONE_CHAR_MULTI_YOMI,
  ONE_CHAR_ONE_YOMI,
  SEEDS,
  SeedsList,
};

export type { Seed, SimpleSeed };
