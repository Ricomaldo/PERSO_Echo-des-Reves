import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import styled from 'styled-components';

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
  width: 100%;
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
