import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const WebDeveloper = () => {
  return (
    <ProfessionPage 
      profession={professionsData['developpeur-web']}
      professionKey="developpeur-web"
      initialLanguage="en"
    />
  );
};

export default WebDeveloper;