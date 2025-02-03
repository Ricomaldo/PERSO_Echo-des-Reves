import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamilyH2};
`;

export const QuoteText = styled(motion.div)`
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.5;
  margin: 0 32px;
  padding: 16px;
  font-size: ${({ theme }) => theme.typography.fontSizeH2};
`;

export const QuoteAuthor = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: ${({ theme }) => theme.typography.fontSizeBody};
  color: ${({ theme }) => theme.textSecondary};
  margin: 32px 64px;
`;

export const NavigationButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.linkPrimary};
  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }
  &:active {
    color: ${({ theme }) => theme.colors.linkActive};
  }
`;

export const PreviousButton = styled(NavigationButton)`
  left: 8px;
`;

export const NextButton = styled(NavigationButton)`
  right: 8px;
`;

export const ChevronIcon = styled.i`
  font-size: 24px;
`;
