import ThemeToggle from '../components/ThemeToggle';
import PageTitle from '../components/PageTitle';
import ProfilCard from '../components/ProfilCard';
import Carousel from '../components/Carousel';

import users from '../utils/users';
import styled from 'styled-components';

const ThemeToggleWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const ProfilSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
`;

const QuoteBloc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 320px;
  width: 320px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border: 2px solid ${({ theme }) => theme.colors.borderNeutral};
  font-size: 20px;
  font-weight: 500;
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow}; /* Ombre dynamique */
`;

const AccueilConnexion = () => {
  return (
    <>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <PageTitle title="Sélection du héros" />
      <ProfilSelector>
        {users.map((user, index) => (
          <ProfilCard key={index} user={user} />
        ))}
      </ProfilSelector>
      <QuoteBloc>
        <Carousel />
      </QuoteBloc>
    </>
  );
};

export default AccueilConnexion;
