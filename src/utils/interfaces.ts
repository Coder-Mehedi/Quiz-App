export interface IQuizQuestion {
  id: string;
  question: string;
  answer: string | string[];
  options: string[];
  answerType: string;
}
