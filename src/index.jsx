import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './utils/context'; // Ton provider personnalisé

import GlobalStyle from './styles/GlobalStyle'; // Styles globaux
import App from './App.jsx'; // Layout principal

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <GlobalStyle /> {/* Styles globaux, maintenant avec accès à "theme" */}
        <App />
      </ThemeProvider>
    </Router>
  </StrictMode>
);
