// 🌟 Sentence は基本。text, pinyins を自身で持つ。
export interface Sentence {
  id: string;
  text: string; // max: 200 input で制限
  pinyinsStr: string;
  createdAt: number;
}
