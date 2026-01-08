import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DeveloppeurMobile = () => {
  return (
    <ProfessionPage 
      profession={professionsData['mobile-dev']}
      professionKey="mobile-dev"
      initialLanguage="fr"
    />
  );
};

export default DeveloppeurMobile;