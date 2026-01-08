import ProfessionPage from "../../ProfessionPage";
import { professionsData } from "../../../data/professionData";

const ChefDeProjet = () => {
  return (
    <ProfessionPage
      profession={professionsData["project-manager "]}
      professionKey="project-manager "
      initialLanguage="fr"
    />
  );
};

export default ChefDeProjet;
