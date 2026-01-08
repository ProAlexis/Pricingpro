import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DeveloppeurWeb = () => {
  return (
    <ProfessionPage 
      profession={professionsData['developpeur-web']}
      professionKey="developpeur-web"
      initialLanguage="fr"
    />
  );
};

export default DeveloppeurWeb;