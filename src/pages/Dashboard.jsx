import { useUser } from '../utils/contexts/UserProvider';
import Collapse from '../components/Collapse';

const Dashboard = () => (
  <>
    <Collapse title="Objectifs en cours">
      <ul>
        <li>Objectif 1 : Faire de la marche</li>
        <li>Objectif 2 : Fumer moins</li>
        <li>Objectif 3 : Pratiquer le Tai-Chi</li>
      </ul>
    </Collapse>
    <Collapse title="Dernière session">
      <p>
        Lorem Elsass ipsum Spätzle rucksack et bredele non turpis sed habitant
        tchao bissame merci vielmols suspendisse leo picon bière météor ante
        Richard Schirmeck quam. ftomi! schnaps sagittis Carola dui ac vielmols,
        tellus turpis, pellentesque Mauris baeckeoffe hopla tristique schpeck
        morbi Gal. réchime hopla sed nullam Salut bisamme wurscht wie id varius
        so Racing. Huguette Verdammi bissame sit Salu bissame libero,
        Kabinetpapier nüdle dolor messti de Bischheim in, Miss Dahlias
        kartoffelsalad sit hopla gal Strasbourg commodo libero, Gal ! sit Hans
        semper tellus hop mänele ornare non auctor, barapli amet vulputate amet
        Oberschaeffolsheim condimentum kougelhopf libero. Chulia Roberstau
        Coopé de Truchtersheim ornare amet, id, mamsell kuglopf quam, senectus
        knack blottkopf, und gewurztraminer eget mollis Christkindelsmärik
        chambon Heineken jetz gehts los placerat ac elementum dignissim
        Wurschtsalad purus geïz consectetur geht's adipiscing Yo dû.
        Oberschaeffolsheim leverwurscht porta salu hopla hoplageiss flammekueche
        aliquam DNA, schneck leo Morbi munster eleifend yeuh. ullamcorper ch'ai
        lacus risus, Pfourtz ! lotto-owe elit Chulien Pellentesque gravida
        knepfle rossbolla s'guelt rhoncus{' '}
      </p>
    </Collapse>
  </>
);
export default Dashboard;
