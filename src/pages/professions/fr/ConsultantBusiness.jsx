import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const ConsultantBusiness = () => {
  return (
    <ProfessionPage
      profession={professionsData["consultant"]}
      professionKey="consultant"
      initialLanguage="fr"
    />
  );
};

export default ConsultantBusiness;
