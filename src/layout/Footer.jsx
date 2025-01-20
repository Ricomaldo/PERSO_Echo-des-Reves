import { useState } from 'react';
import TapBar from '../components/TapBar';

const Footer = () => {
  const [isMenuPlusOpen, setIsMenuPlusOpen] = useState(false);

  const toggleMenuPlus = () => {
    setIsMenuPlusOpen((prevState) => !prevState);
  };

  return (
    <footer>
      <TapBar isMenuPlusOpen={isMenuPlusOpen} toggleMenuPlus={toggleMenuPlus} />
    </footer>
  );
};

export default Footer;
