import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DeveloppeurBackend = () => {
  return (
    <ProfessionPage 
      profession={professionsData['backend-dev']}
      professionKey="backend-dev"
      initialLanguage="fr"
    />
  );
};

export default DeveloppeurBackend;