import { Link } from 'react-router-dom';
import { useUser } from '../../utils/contexts/UserProvider';
import { ProfilCard } from '../../components/ProfilCard';

import Logo from '../../assets/logo.png';
import users from '../../mocks/users.js';
import {
  HeaderContainer,
  HeaderLogo,
  HeaderTitle,
  ProfilWrapper,
} from './headerStyles';

const Header = ({ isLoginPage }) => {
  const { activeUser, changeUser } = useUser();

  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderLogo src={Logo} alt="Logo EchoDesReves" />
      </Link>
      <HeaderTitle>Echo des Rêves</HeaderTitle>

      {!isLoginPage && (
        <ProfilWrapper>
          {users.map((user) => (
            <ProfilCard
              key={user.name}
              user={user}
              size="small"
              onClick={() => changeUser(user.name)}
              showName={false}
              isActiveUser={activeUser?.name === user.name}
            />
          ))}
        </ProfilWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;
