import { Form, Button, Radio, Typography } from 'antd';

import { useQuiz } from 'components/_context/quiz';

const QuizForm = (): JSX.Element => {
  const {
    quizQuestions,
    correctAnswers,
    wrongAnswers,
    value,
    isSumitted,
    onChange,
    onFinish,
  } = useQuiz();

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
