import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const DataScientist = () => {
  return (
    <ProfessionPage 
      profession={professionsData['data-scientist']}
      professionKey="data-scientist"
      initialLanguage="fr"
    />
  );
};

export default DataScientist;
