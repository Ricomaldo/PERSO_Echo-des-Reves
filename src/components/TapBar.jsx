import { NavLink } from 'react-router-dom';
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
  padding: 8px;
  position: relative;
  z-index: 50;
`;

const TapBarLink = styled(NavLink)`
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-neutral-color);
  border-radius: 25%;
`;

const TapBarIcon = styled.div`
  width: 32px;
  height: 32px;
  color: var(--primary-color);
  display: inline-block;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const MenuPlusButton = styled.button`
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-neutral-color);
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

  return (
    <>
      <TapBarContainer>
        {icons.map((icon) =>
          icon.action ? (
            <MenuPlusButton key={icon.name} onClick={icon.action}>
              <TapBarIcon>
                <icon.icon alt={icon.name} />
              </TapBarIcon>
            </MenuPlusButton>
          ) : (
            <TapBarLink key={icon.name} to={icon.link}>
              <TapBarIcon>
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
