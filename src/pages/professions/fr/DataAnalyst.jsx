import ProfessionPage from "../../ProfessionPage";
import { professionsData } from "../../../data/professionData";

const DataAnalyst = () => {
  return (
    <ProfessionPage
      profession={professionsData["data-analyst"]}
      professionKey="data-analyst"
      initialLanguage="fr"
    />
  );
};

export default DataAnalyst;
