import { Hanzi } from "@/features/hanzi";
import { Sentence } from "@/features/sentence";

export interface SentenceFormProps {
  forms: string; // max 200 input　で制限
  total: number;
  hanzis: Hanzi[];
  hanziSentences: Sentence[];
  articleId?: string;
}
