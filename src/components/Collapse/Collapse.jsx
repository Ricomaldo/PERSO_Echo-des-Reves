import { useState } from 'react';
import {
  CollapseContainer,
  CollapseHeader,
  CollapseContent,
  CollapseText,
  ArrowIcon,
} from './collapseStyles';
import { motion } from 'framer-motion';

const collapseVariants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

const Collapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CollapseContainer>
      <CollapseHeader
        onClick={toggleCollapse}
        aria-expanded={isOpen}
        aria-controls={`collapse-content-${title}`}
      >
        <h2>{title}</h2>
        <ArrowIcon
          className="fa fa-chevron-down"
          animate={{ rotate: isOpen ? -180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </CollapseHeader>

      <CollapseContent
        id={`collapse-content-${title}`}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={collapseVariants}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <CollapseText>{children}</CollapseText>
      </CollapseContent>
    </CollapseContainer>
  );
};

export default Collapse;
