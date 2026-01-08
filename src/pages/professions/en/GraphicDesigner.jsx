import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const GraphicDesigner = () => {
  return (
    <ProfessionPage
      profession={professionsData["graphic-designer"]}
      professionKey="graphic-designer"
      initialLanguage="en"
    />
  );
};

export default GraphicDesigner;
