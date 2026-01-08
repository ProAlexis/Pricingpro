import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DevOpsEngineer = () => {
  return (
    <ProfessionPage 
      profession={professionsData['devops']}
      professionKey="devops"
      initialLanguage="en"
    />
  );
};

export default DevOpsEngineer;
