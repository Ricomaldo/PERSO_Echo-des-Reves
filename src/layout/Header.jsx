import { Link } from 'react-router-dom';
import { useUser } from '../utils/contexts/UserProvider';
import Logo from '../assets/logo.png';
import styled from 'styled-components';
import users from '../utils/users';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  border: solid 2px ${({ theme }) => theme.colors.borderNeutral};
  border-radius: 16px;
  padding: 8px;
`;

const HeaderLogo = styled.img`
  height: 48px;
  width: 48px;
`;
const HeaderTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizeHeader};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeightHeader};
  font-family: ${({ theme }) => theme.typography.fontFamilyHeader};
`;

const ProfilWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.interaction};
  }
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 44px;
  height: 44px;
  object-fit: cover;
  border: 2px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.highlight : theme.colors.primary};
`;

const Header = ({ title }) => {
  const { activeUser, changeUser } = useUser(); // Récupère l'utilisateur actif depuis le contexte

  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderLogo src={Logo} alt="Logo EchoDesReves" />
      </Link>
      <HeaderTitle>{title}</HeaderTitle>

      <ProfilWrapper>
        {users.map((user) => (
          <StyledImg
            key={user.name}
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            onClick={() => changeUser(user.name)}
            $isActive={activeUser?.name === user.name} // Utilise `$` pour éviter l'avertissement
          />
        ))}
      </ProfilWrapper>
    </HeaderContainer>
  );
};

export default Header;
