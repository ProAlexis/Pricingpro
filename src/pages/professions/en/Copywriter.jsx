import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const Copywriter = () => {
  return (
    <ProfessionPage
      profession={professionsData["copywriter"]}
      professionKey="copywriter"
      initialLanguage="en"
    />
  );
};

export default Copywriter;
