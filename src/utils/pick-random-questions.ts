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
  const randomQuestions: IQuizQuestion[] = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    const randomQuestion = pickRandomQuestion(quizQuestions);
    // check if the question is already in the array
    if (randomQuestions.find((question) => question.id === randomQuestion.id)) {
      // if it is, then we need to pick another question
      i--;
    } else randomQuestions.push(randomQuestion);
  }
  return randomQuestions;
};
