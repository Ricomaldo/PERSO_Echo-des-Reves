import { useState, useEffect } from 'react';
import styled from 'styled-components';
import quotes from '../utils/quotes';

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Caveat', cursive;
`;

const QuoteText = styled.div`
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin: 0 32px;
  padding: 16px;
`;

const QuoteAuthor = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin: 32px 64px;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    color: ${({ theme }) => theme.colors.interaction};
  }
`;

const PreviousButton = styled(NavigationButton)`
  left: 16px;
`;

const NextButton = styled(NavigationButton)`
  right: 16px;
`;

const ChevronIcon = styled.i`
  font-size: 24px;
`;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Choisir une citation aléatoirement au montage du composant
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentIndex(randomIndex);
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? quotes.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === quotes.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!quotes || quotes.length === 0) {
    return <CarouselWrapper>No quotes available</CarouselWrapper>;
  }

  return (
    <CarouselWrapper>
      <PreviousButton onClick={goToPrevious}>
        <ChevronIcon className="fa-solid fa-chevron-left" />
      </PreviousButton>
      <QuoteText>"{quotes[currentIndex].text}"</QuoteText>
      <QuoteAuthor>{quotes[currentIndex].author}</QuoteAuthor>
      <NextButton onClick={goToNext}>
        <ChevronIcon className="fa-solid fa-chevron-right" />
      </NextButton>
    </CarouselWrapper>
  );
};

export default Carousel;
