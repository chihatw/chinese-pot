export interface Seed {
  _id: string;
  yomis: string[];
  hinshi: string;
  midashi: string;
  hinshi_detail: string;
  katsuyou_type: string;
  __v: string;
}

export interface SimpleSeed {
  yomi: string;
  midashi: string;
}
