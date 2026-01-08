import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DevOps = () => {
  return (
    <ProfessionPage 
      profession={professionsData['devops']}
      professionKey="devops"
      initialLanguage="fr"
    />
  );
};

export default DevOps;
