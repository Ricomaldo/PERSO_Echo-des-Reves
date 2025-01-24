import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@assets/icons/home.svg?react';
import RocketIcon from '@assets/icons/rocket.svg?react';
import PlusIcon from '@assets/icons/circle-plus.svg?react';
import SettingsIcon from '@assets/icons/settings.svg?react';
import CalendarIcon from '@assets/icons/calendar-days.svg?react';
import MenuPlus from '../components/MenuPlus';

const TapBarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px;
  position: relative;
  z-index: 50;
  border: solid 2px ${({ theme }) => theme.colors.borderNeutral};
  border-radius: 16px;
`;

const TapBarLink = styled(Link)`
  height: 60px;
  width: 60px;
  display: grid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border-radius: 25%;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const TapBarIcon = styled.div`
  width: 40px;
  height: 40px;
  color: ${({ $location, $link, theme }) =>
    $location === $link ? theme.colors.highlight : theme.colors.primary};
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

const MenuPlusButton = styled.button`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border-radius: 25%;
  border: none;
  cursor: pointer;
`;

const TapBar = ({ isMenuPlusOpen, toggleMenuPlus }) => {
  const icons = [
    { name: 'home', icon: HomeIcon, link: '/dashboard' },
    { name: 'rocket', icon: RocketIcon, link: '/objectifs' },
    { name: 'plus', icon: PlusIcon, link: '#', action: toggleMenuPlus },
    { name: 'calendar', icon: CalendarIcon, link: '/calendrier' },
    { name: 'settings', icon: SettingsIcon, link: '/settings' },
  ];
  const location = useLocation();

  return (
    <>
      <TapBarContainer>
        {icons.map((icon) =>
          icon.action ? (
            <MenuPlusButton key={icon.name} onClick={icon.action}>
              <TapBarIcon $location={location.pathname} $link={icon.link}>
                <icon.icon alt={icon.name} />
              </TapBarIcon>
            </MenuPlusButton>
          ) : (
            <TapBarLink key={icon.name} to={icon.link}>
              <TapBarIcon $location={location.pathname} $link={icon.link}>
                <icon.icon alt={icon.name} />
              </TapBarIcon>
            </TapBarLink>
          )
        )}
      </TapBarContainer>

      <MenuPlus isOpen={isMenuPlusOpen} closeMenu={toggleMenuPlus} />
    </>
  );
};

export default TapBar;
