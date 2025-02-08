import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CollapseContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.borderBase};
`;

export const CollapseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px;
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.backgroundHighlight};
  transition: filter 0.2s ease;
  font-family: ${({ theme }) => theme.typography.fontFamilyH2};
  font-size: ${({ theme }) => theme.typography.fontSizeH2};
  border-radius: 8px 8px 0 0;
  &:hover {
    filter: brightness(1.1);
  }
`;

export const CollapseContent = styled(motion.div)`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundSurface};
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

export const CollapseText = styled.div`
  padding: 12px;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.typography.fontSizeBody};
`;

export const ArrowIcon = styled(motion.i)`
  transition: transform 0.3s ease;
`;
