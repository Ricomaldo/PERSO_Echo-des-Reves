import HomeIcon from '/src/assets/icons/home.svg?react';
import RocketIcon from '/src/assets/icons/rocket.svg?react';
import PlusIcon from '/src/assets/icons/circle-plus.svg?react';
import SettingsIcon from '/src/assets/icons/settings.svg?react';
import CalendarIcon from '/src/assets/icons/calendar-days.svg?react';

export const tabBarItems = [
  { name: 'home', icon: HomeIcon, link: '/dashboard' },
  { name: 'rocket', icon: RocketIcon, link: '/objectifs' },
  { name: 'plus', icon: PlusIcon, link: '#', isMenuButton: true },
  { name: 'calendar', icon: CalendarIcon, link: '/historique' },
  { name: 'settings', icon: SettingsIcon, link: '/settings' },
];
