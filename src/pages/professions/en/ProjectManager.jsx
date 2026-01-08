import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const ProjectManager = () => {
  return (
    <ProfessionPage
      profession={professionsData["project-manager "]}
      professionKey="project-manager "
      initialLanguage="en"
    />
  );
};

export default ProjectManager;
