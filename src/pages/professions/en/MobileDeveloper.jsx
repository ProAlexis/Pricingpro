import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const MobileDeveloper = () => {
  return (
    <ProfessionPage
      profession={professionsData["mobile-dev"]}
      professionKey="mobile-dev"
      initialLanguage="en"
    />
  );
};

export default MobileDeveloper;
