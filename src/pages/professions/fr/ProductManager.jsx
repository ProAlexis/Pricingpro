import ProfessionPage from '../../ProfessionPage';
import { professionsData } from '../../../data/professionData';

const ProductManager = () => {
  return (
    <ProfessionPage
      profession={professionsData["product-manager"]}
      professionKey="product-manager"
      initialLanguage="fr"
    />
  );
};

export default ProductManager;
