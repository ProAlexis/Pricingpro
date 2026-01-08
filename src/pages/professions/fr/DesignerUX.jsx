import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DesignerUX = () => {
  return (
    <ProfessionPage 
      profession={professionsData['designer-ux']}
      professionKey="designer-ux"
      initialLanguage="fr"
    />
  );
};

export default DesignerUX;
