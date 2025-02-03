import React from 'react';
import { Button } from '../../components/Button';
import { NavigationContainer } from './navigationArrowsStyles';

const NavigationArrows = ({ onPrev, onNext, canGoPrev, canGoNext }) => {
  return (
    <NavigationContainer>
      {canGoPrev && (
        <Button
          $variant="secondary"
          onClick={onPrev}
          $fullWidth={false}
          $minWidth="40px"
          $maxWidth="50px"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </Button>
      )}

      {canGoNext && (
        <Button
          $variant="secondary"
          onClick={onNext}
          $fullWidth={false}
          $minWidth="40px"
          $maxWidth="50px"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </Button>
      )}
    </NavigationContainer>
  );
};

export default NavigationArrows;
