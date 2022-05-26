import { RadioChangeEvent } from 'antd';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { IQuizQuestion } from 'utils/interfaces';
import { pickRandomQuestions } from 'utils/pick-random-questions';
import useLocalStorage from '_hooks/use-local-storage';
import quizQuestionsData from 'db.json';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import {
  filterCorrectAnswers,
  filterWrongAnswers,
} from 'utils/helper-functions';

const NUMBER_OF_QUESTIONS_TO_SHOW = 3;

const QuizContext = createContext({
  quizQuestions: [] as IQuizQuestion[],
  value: {} as any,
  onFinish: (values: object) => {},
  onChange: (id: string, e: RadioChangeEvent | CheckboxValueType[]) => {},
  isSumitted: false,
  correctAnswers: [] as IQuizQuestion[],
  wrongAnswers: [] as IQuizQuestion[],
});

function QuizProvider({ children }: { children: ReactNode }) {
  const [quizQuestions, setQuizQuestions] = useLocalStorage<IQuizQuestion[]>(
    'questions',
    []
  );
  useEffect(() => {
    quizQuestions.length === 0 &&
      setQuizQuestions(
        pickRandomQuestions(NUMBER_OF_QUESTIONS_TO_SHOW, quizQuestionsData)
      );
    // setQuizQuestions(quizQuestionsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useLocalStorage<any>('value', {});
  const [correctAnswers, setCorrectAnswers] = useLocalStorage<IQuizQuestion[]>(
    'correctAnswers',
    []
  );
  const [wrongAnswers, setWrongAnswers] = useLocalStorage<IQuizQuestion[]>(
    'wrongAnswers',
    []
  );

  const onFinish = (values: any) => {
    const correctAnswers = filterCorrectAnswers(quizQuestions, values);
    const wrongAnswers = filterWrongAnswers(quizQuestions, values);
    setCorrectAnswers(correctAnswers);
    setWrongAnswers(wrongAnswers);
  };

  const onChange = (
    id: string,
    e: RadioChangeEvent | CheckboxValueType[] | any
  ) => {
    if (Array.isArray(e)) {
      setValue((prevState: any) => ({
        ...prevState,
        [id]: e,
      }));
    } else {
      setValue((prev: any) => ({ ...prev, [id]: e.target.value }));
    }
  };
  const isSumitted = correctAnswers.length > 0 || wrongAnswers.length > 0;

  return (
    <QuizContext.Provider
      value={{
        quizQuestions,
        value,
        onFinish,
        onChange,
        isSumitted,
        correctAnswers,
        wrongAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

const useQuiz = () => useContext(QuizContext);

export { QuizProvider, useQuiz };
