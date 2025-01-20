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
  max-width: 375px;
`;

const HeaderLogo = styled.img`
  height: 64px;
  width: 64px;
`;

const HeaderTitle = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamilyHeader};
  font-weight: ${({ theme }) => theme.typography.fontWeightHeader};
  font-size: ${({ theme }) => theme.typography.fontSizeHeader};
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderLogo src={Logo} alt="Logo EchoDesReves" />
      </Link>
      <HeaderTitle>Echo des Rêves</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;
