import { IQuizQuestion } from './interfaces';

export const filterCorrectAnswers = (
  quizQuestions: IQuizQuestion[],
  values: any
) =>
  quizQuestions.filter((question: IQuizQuestion) => {
    return question.answerType === 'single'
      ? values[question.id] === question.answer
      : values[question.id].every((answer: string) =>
          question.answer.includes(answer)
        );
  });
export const filterWrongAnswers = (
  quizQuestions: IQuizQuestion[],
  values: any
) =>
  quizQuestions.filter((question: IQuizQuestion) => {
    return question.answerType === 'single'
      ? values[question.id] !== question.answer
      : !values[question.id].every((answer: string) =>
          question.answer.includes(answer)
        );
  });
