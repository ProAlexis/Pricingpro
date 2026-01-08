import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const Redacteur = () => {
  return (
    <ProfessionPage 
      profession={professionsData['copywriter']}
      professionKey="copywriter"
      initialLanguage="fr"
    />
  );
};

export default Redacteur;