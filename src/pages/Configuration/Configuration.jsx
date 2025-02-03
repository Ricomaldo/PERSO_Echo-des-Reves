import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle';
import { PageTitle } from '../../layout';
import { GiphyWrapper, ThemeToggleWrapper } from './configurationStyles';

const Configuration = () => (
  <>
    <PageTitle title="Configuration" />
    <Link to="/Adventure">
      <GiphyWrapper>
        <iframe
          src="https://giphy.com/embed/26FmQ6EOvLxp6cWyY"
          allowFullScreen
          title="Giphy"
        ></iframe>
      </GiphyWrapper>
    </Link>
    <ThemeToggleWrapper>
      <ThemeToggle />
    </ThemeToggleWrapper>
  </>
);

export default Configuration;
