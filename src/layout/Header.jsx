import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  height: 72px;
`;

const HeaderLogo = styled.img`
  height: 64px;
  width: 64px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderLogo src={Logo} alt="Logo EchoDesReves" />
      </Link>
    </HeaderContainer>
  );
};

export default Header;
