import { Form, Button, Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import quizQuestions from 'db.json';
import useLocalStorage from '_hooks/use-local-storage';

interface IQuizQuestion {
  id: string;
  question: string;
  answer: string;
  options: string[];
  answerType: string;
}

const QuizForm = () => {
  // generate a unique id for user
  const generateId = () => {
    return '_' + Math.random().toString(36);
  };
  const [state, setState] = useLocalStorage('quiz', {});
  console.log(state);
  const [value, setValue] = useState<any>({});
  const [correctAnswers, setCorrectAnswers] = useState<IQuizQuestion[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IQuizQuestion[]>([]);

  const pickRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    const randomQuestion = quizQuestions[randomIndex];
    return randomQuestion;
  };

  const pick10RandomQuestions = () => {
    const randomQuestions = [];
    for (let i = 0; i < 10; i++) {
      const randomQuestion = pickRandomQuestion();
      randomQuestions.push(randomQuestion);
    }
    return randomQuestions;
  };

  const onFinish = (values: any) => {
    console.log(pick10RandomQuestions());
    const correctAnswers = quizQuestions.filter(
      (question: IQuizQuestion) => question.answer === values[question.id]
    );
    const wrongAnswers = quizQuestions.filter(
      (question: IQuizQuestion) => question.answer !== values[question.id]
    );
    setCorrectAnswers(correctAnswers);
    setWrongAnswers(wrongAnswers);
    setState({ correctAnswers, wrongAnswers });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (id: string, e: RadioChangeEvent) => {
    setValue((prev: any) => ({ ...prev, [id]: e.target.value }));
  };

  return (
    <Form
      name='basic'
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      {quizQuestions.map((question: any) => {
        return (
          <div key={question.id}>
            <h1>{question.question}</h1>
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
      <Button htmlType='submit'>Submit</Button>
    </Form>
  );
};

export default QuizForm;
