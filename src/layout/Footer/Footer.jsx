import { useState } from 'react';
import { TabBar } from '../../components/TabBar';
import { FooterContainer } from './footerStyles';

const Footer = () => {
  const [isMenuPlusOpen, setIsMenuPlusOpen] = useState(false);

  return (
    <FooterContainer>
      <TabBar
        isMenuPlusOpen={isMenuPlusOpen}
        toggleMenuPlus={() => setIsMenuPlusOpen((prev) => !prev)}
      />
    </FooterContainer>
  );
};

export default Footer;
