import { useLocation } from 'react-router-dom';
import {
  TabBarContainer,
  TabBarLink,
  TabBarIcon,
  MenuButton,
} from './tabBarStyles';
import { tabBarItems } from './tabBarConfig';
import MenuPlus from './MenuPlus';

const TabBar = ({ isMenuPlusOpen, toggleMenuPlus }) => {
  const location = useLocation();

  return (
    <>
      <TabBarContainer>
        {tabBarItems.map((item) =>
          item.isMenuButton ? (
            <MenuButton
              key={item.name}
              onClick={toggleMenuPlus}
              aria-label="Ouvrir le menu Plus"
            >
              <TabBarIcon $isActive={false}>
                <item.icon />
              </TabBarIcon>
            </MenuButton>
          ) : (
            <TabBarLink
              key={item.name}
              to={item.link}
              aria-label={`Aller à ${item.name}`}
            >
              <TabBarIcon $isActive={location.pathname === item.link}>
                <item.icon />
              </TabBarIcon>
            </TabBarLink>
          )
        )}
      </TabBarContainer>

      <MenuPlus isOpen={isMenuPlusOpen} closeMenu={toggleMenuPlus} />
    </>
  );
};

export default TabBar;
