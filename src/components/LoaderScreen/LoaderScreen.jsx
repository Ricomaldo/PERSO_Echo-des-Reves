import { useState, useEffect } from 'react';
import { LoaderWrapper, Spinner } from './loaderScreenStyles';

// ⏳ Temps minimum d'affichage du loader (en millisecondes)
const MIN_LOADING_TIME = 1000; // 🔥 1 seconde minimum

const LoaderScreen = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true); // ✅ Toujours afficher au début si isLoading est true
    } else {
      setTimeout(() => {
        setIsVisible(false); // ✅ Masquer après MIN_LOADING_TIME
      }, MIN_LOADING_TIME);
    }
  }, [isLoading]);

  // 🔥 Assurer que le spinner est bien visible
  return isVisible ? (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  ) : null;
};

export default LoaderScreen;
