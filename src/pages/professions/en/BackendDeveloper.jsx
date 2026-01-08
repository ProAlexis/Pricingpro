import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const BackendDeveloper = () => {
  return (
    <ProfessionPage
      profession={professionsData["backend-dev"]}
      professionKey="backend-dev"
      initialLanguage="en"
    />
  );
};

export default BackendDeveloper;
