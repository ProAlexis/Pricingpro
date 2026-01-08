import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const MarketingConsultant = () => {
  return (
    <ProfessionPage 
      profession={professionsData['consultant-marketing']}
      professionKey="consultant-marketing"
      initialLanguage="en"
    />
  );
};

export default MarketingConsultant;
