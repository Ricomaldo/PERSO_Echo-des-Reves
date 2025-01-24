import Frame from '../layout/Frame';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Error = () => {
  return (
    <>
      <PageTitle title="Error 404" />
      <Frame>
        <ErrorContainer>
          <div className="info">Oups! Il y a une erreur dans l'url...</div>
          <Link to="/">Retourner sur la page d'accueil</Link>
        </ErrorContainer>
      </Frame>
    </>
  );
};

export default Error;
