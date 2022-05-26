import type { NextPage } from 'next';
// dynamic import
import dynamic from 'next/dynamic';
import Layout from '_root/layout';
const QuizForm = dynamic(() => import('../src/components/form'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Layout>
      <QuizForm />
    </Layout>
  );
};

export default Home;
