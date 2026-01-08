import ProfessionPage from "../../ProfessionPage";
import { professionsData } from "../../../data/professionData";

const ConsultantMarketing = () => {
  return (
    <ProfessionPage
      profession={professionsData["consultant-marketing"]}
      professionKey="consultant-marketing"
      initialLanguage="fr"
    />
  );
};

export default ConsultantMarketing;
