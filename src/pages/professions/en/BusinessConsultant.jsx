import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const BusinessConsultant = () => {
  return (
    <ProfessionPage
      profession={professionsData["consultant"]}
      professionKey="consultant"
      initialLanguage="en"
    />
  );
};

export default BusinessConsultant;
