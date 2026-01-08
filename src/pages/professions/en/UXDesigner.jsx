import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const UXDesigner = () => {
  return (
    <ProfessionPage 
      profession={professionsData['designer-ux']}
      professionKey="designer-ux"
      initialLanguage="en"
    />
  );
};

export default UXDesigner;
