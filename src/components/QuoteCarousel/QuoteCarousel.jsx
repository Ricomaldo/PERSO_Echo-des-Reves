import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CarouselWrapper,
  QuoteText,
  QuoteAuthor,
  PreviousButton,
  NextButton,
  ChevronIcon,
} from './quoteCarouselStyles';
import quotes from '../../utils/data/quotes';

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const QuoteCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentIndex(randomIndex);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  if (!quotes || quotes.length === 0) {
    return <CarouselWrapper>No quotes available</CarouselWrapper>;
  }

  return (
    <CarouselWrapper>
      <PreviousButton onClick={goToPrevious} aria-label="Citation précédente">
        <ChevronIcon className="fa-solid fa-chevron-left" />
      </PreviousButton>

      <QuoteText
        key={quotes[currentIndex].text}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeVariants}
        transition={{ duration: 0.5 }}
      >
        "{quotes[currentIndex].text}"
      </QuoteText>

      <QuoteAuthor>{quotes[currentIndex].author}</QuoteAuthor>

      <NextButton onClick={goToNext} aria-label="Citation suivante">
        <ChevronIcon className="fa-solid fa-chevron-right" />
      </NextButton>
    </CarouselWrapper>
  );
};

export default QuoteCarousel;
