// 🌟 Sentence は基本。text, pinyins を自身で持つ。
export interface Sentence {
  id: string;
  text: string;
  pinyinsStr: string;
  createdAt: number;
}
