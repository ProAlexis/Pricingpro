import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const FullStackDeveloper = () => {
  return (
    <ProfessionPage
      profession={professionsData["fullstack-dev"]}
      professionKey="fullstack-dev"
      initialLanguage="en"
    />
  );
};

export default FullStackDeveloper;
