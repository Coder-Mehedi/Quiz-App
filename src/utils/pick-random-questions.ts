import { IQuizQuestion } from './interfaces';

const pickRandomQuestion = (quizQuestions: IQuizQuestion[]): IQuizQuestion => {
  const randomIndex = Math.floor(Math.random() * quizQuestions.length);
  const randomQuestion = quizQuestions[randomIndex];
  return randomQuestion;
};

export const pickRandomQuestions = (
  numberOfQuestions: number,
  quizQuestions: IQuizQuestion[]
): IQuizQuestion[] => {
  const randomQuestions = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    const randomQuestion = pickRandomQuestion(quizQuestions);
    randomQuestions.push(randomQuestion);
  }
  return randomQuestions;
};
