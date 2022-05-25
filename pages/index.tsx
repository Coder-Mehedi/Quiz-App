import type { NextPage } from 'next';
// dynamic import
import dynamic from 'next/dynamic';
const QuizForm = dynamic(() => import('../src/components/form'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div>
      <QuizForm />
    </div>
  );
};

export default Home;
