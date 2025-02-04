import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle';
import { PageTitle } from '../../layout';
import { GiphyWrapper, ThemeToggleWrapper } from './configurationStyles';
import ThemeManager from '../../components/ThemeManager/ThemeManager';
import { Collapse } from '../../components/Collapse';

const Configuration = () => (
  <>
    <PageTitle title="Personalisation" />{' '}
    <ThemeToggleWrapper>
      <ThemeToggle />
    </ThemeToggleWrapper>
    <Collapse title="Theme Manager" defaultOpen={true}>
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
