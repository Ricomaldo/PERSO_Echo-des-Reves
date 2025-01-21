import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './utils/contexts/UserProvider.jsx';
import { ThemeProvider } from './utils/contexts/ThemeProvider.jsx';

import GlobalStyle from './styles/GlobalStyle'; // Styles globaux
import App from './App.jsx'; // Layout principal

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <ThemeProvider>
          <GlobalStyle /> <App />
        </ThemeProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
