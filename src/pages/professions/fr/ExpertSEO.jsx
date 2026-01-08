import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const ExpertSEO = () => {
  return (
    <ProfessionPage 
      profession={professionsData['seo']}
      professionKey="seo"
      initialLanguage="fr"
    />
  );
};

export default ExpertSEO;