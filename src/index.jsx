import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { UserProvider } from './utils/contexts/UserProvider.jsx';
import { ThemeProvider } from './utils/contexts/ThemeProvider.jsx';
import ScrollToTop from './layout/ScrollToTop.jsx';

import GlobalStyle from './styles/GlobalStyle';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <UserProvider>
        <ThemeProvider>
          <GlobalStyle /> <App />
        </ThemeProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
