import { useUser } from '../utils/contexts/UserProvider';
import { Link } from 'react-router-dom';

import ThemeToggle from '../components/ThemeToggle';
import ProfilCard from '../components/ProfilCard';
import Carousel from '../components/Carousel';

import users from '../utils/users';
import styled from 'styled-components';

const ThemeToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
  padding: 16px;
`;

const QuoteBloc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 240px;
  width: 320px;

  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border: 2px solid ${({ theme }) => theme.colors.borderNeutral};
  font-size: 24px;
  font-weight: 500;
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow}; /* Ombre dynamique */
`;
const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 48px;
`;
const LoginPage = () => {
  const { changeUser } = useUser();

  return (
    <PageLayout>
      <h1 style={{ textAlign: 'center' }}>Sélection du héros</h1>
      <Link to="/dashboard">
        <ProfilSelector>
          {users.map((user) => (
            <ProfilCard
              key={user.name}
              user={user}
              onClick={() => changeUser(user.name)} // Appelle `changeUser` au clic
            />
          ))}
        </ProfilSelector>
      </Link>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <QuoteBloc>
        <Carousel />
      </QuoteBloc>{' '}
    </PageLayout>
  );
};

export default LoginPage;
