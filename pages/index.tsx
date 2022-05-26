import { QuizProvider } from 'components/_context/quiz';
import Layout from 'components/_root/layout';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
const QuizForm = dynamic(() => import('../src/components/quiz-form'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Layout>
      <QuizProvider>
        <QuizForm />
      </QuizProvider>
    </Layout>
  );
};

export default Home;
