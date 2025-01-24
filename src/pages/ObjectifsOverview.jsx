import { useUser } from '../utils/contexts/UserProvider';
import Collapse from '../components/Collapse';

const ObjectifsOverview = () => (
  <>
    <Collapse title="Faire de la marche">
      <p>Oui ce serait bien</p>
    </Collapse>
    <Collapse title="Fumer moins">
      <p>Non t'as eu l'idée tout seul ?</p>
    </Collapse>
    <Collapse title="Pratiquer le Tai-Chi">
      <p>A toute heure 😊</p>
    </Collapse>
  </>
);
export default ObjectifsOverview;
