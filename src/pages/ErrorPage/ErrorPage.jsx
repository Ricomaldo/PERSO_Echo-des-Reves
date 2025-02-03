import { Frame, PageTitle } from '../../layout';
import { Link } from 'react-router-dom';
import { ErrorContainer } from './errorPageStyles';

const Error = () => {
  return (
    <>
      <PageTitle title="404" />
      <Frame>
        <ErrorContainer>
          <div className="info">Oups! Il y a une erreur dans l'URL...</div>
          <Link to="/">Retourner sur la page d'accueil</Link>
        </ErrorContainer>
      </Frame>
    </>
  );
};

export default Error;
