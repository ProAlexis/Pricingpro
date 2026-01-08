import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DeveloppeurFullStack = () => {
  return (
    <ProfessionPage 
      profession={professionsData['fullstack-dev']}
      professionKey="fullstack-dev"
      initialLanguage="fr"
    />
  );
};

export default DeveloppeurFullStack;