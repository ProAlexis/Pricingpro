import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const SEOExpert = () => {
  return (
    <ProfessionPage
      profession={professionsData["seo"]}
      professionKey="seo"
      initialLanguage="en"
    />
  );
};

export default SEOExpert;
