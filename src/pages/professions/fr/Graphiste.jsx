import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const Graphiste = () => {
  return (
    <ProfessionPage
      profession={professionsData["graphic-designer"]}
      professionKey="graphic-designer"
      initialLanguage="fr"
    />
  );
};

export default Graphiste;
