import { Form, Button, Radio, RadioChangeEvent, Typography } from 'antd';
import { useEffect } from 'react';
import quizQuestionsData from 'db.json';
import useLocalStorage from '_hooks/use-local-storage';
import { IQuizQuestion } from 'utils/interfaces';
import { pickRandomQuestions } from 'utils/pick-random-questions';

const NUMBER_OF_QUESTIONS_TO_SHOW = 3;

const QuizForm = (): JSX.Element => {
  const [quizQuestions, setQuizQuestions] = useLocalStorage<IQuizQuestion[]>(
    'questions',
    []
  );
  useEffect(() => {
    quizQuestions.length === 0 &&
      setQuizQuestions(
        pickRandomQuestions(NUMBER_OF_QUESTIONS_TO_SHOW, quizQuestionsData)
      );
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
    const correctAnswers = quizQuestions.filter(
      (question: IQuizQuestion) => question.answer === values[question.id]
    );
    const wrongAnswers = quizQuestions.filter(
      (question: IQuizQuestion) => question.answer !== values[question.id]
    );
    setCorrectAnswers(correctAnswers);
    setWrongAnswers(wrongAnswers);
  };

  const onChange = (id: string, e: RadioChangeEvent) => {
    setValue((prev: any) => ({ ...prev, [id]: e.target.value }));
  };
  const isSumitted = correctAnswers.length > 0 || wrongAnswers.length > 0;

  return (
    <>
      <Typography.Title type='warning'>
        {isSumitted && 'Answer submitted !'}
      </Typography.Title>
      <br />
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete='off'
        initialValues={value}
      >
        {quizQuestions.map((question: any) => {
          return (
            <div key={question.id}>
              <h1>
                {question.question}{' '}
                {isSumitted &&
                  !!correctAnswers.find(
                    (answer) => answer.id === question.id
                  ) && (
                    <Typography.Text type='success'> - Correct</Typography.Text>
                  )}
                {isSumitted &&
                  !!wrongAnswers.find(
                    (answer) => answer.id === question.id
                  ) && (
                    <Typography.Text type='danger'> - Wrong</Typography.Text>
                  )}
              </h1>
              {question.answerType === 'single' && (
                <Form.Item name={question.id}>
                  <Radio.Group
                    onChange={(e) => onChange(question.id, e)}
                    value={value[question.id]}
                  >
                    {question.options.map((answer: any, index: number) => {
                      return (
                        <Radio key={index} value={answer}>
                          <p>{answer}</p>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              )}
            </div>
          );
        })}
        {!isSumitted && <Button htmlType='submit'>Submit</Button>}
      </Form>
    </>
  );
};

export default QuizForm;
