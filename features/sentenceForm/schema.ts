import { Hanzi } from "@/features/hanzi";
import { Sentence } from "@/features/sentence";

export interface SentenceFormProps {
  forms: string;
  hanzis: Hanzi[];
  sentences: Sentence[];
  articleId?: string;
  total: number;
}
