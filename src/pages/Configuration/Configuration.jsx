import { Link } from 'react-router-dom';
import { GiphyWrapper } from './configurationStyles';

import { PageTitle } from '../../layout';
import ThemeManager from '../../components/ThemeManager/ThemeManager';
import { Collapse } from '../../components/Collapse';
const Configuration = () => (
  <>
    <PageTitle title="Personalisation" />{' '}
    <Collapse title="Theme Manager">
      <ThemeManager />{' '}
    </Collapse>
    <Collapse title="There is no try" defaultOpen={false}>
      <Link to="/Adventure">
        <GiphyWrapper>
          <iframe
            src="https://giphy.com/embed/26FmQ6EOvLxp6cWyY"
            allowFullScreen
            title="Giphy"
          ></iframe>
        </GiphyWrapper>
      </Link>
    </Collapse>
  </>
);

export default Configuration;
