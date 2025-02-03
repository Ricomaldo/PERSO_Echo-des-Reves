import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { UserProvider } from './utils/contexts/UserProvider.jsx';
import { ThemeProvider } from './utils/contexts/ThemeProvider.jsx';
import { ScrollToTop } from './layout';

import GlobalStyle from './styles/global/GlobalStyle';
import App from './App.jsx';

const RootProviders = ({ children }) => (
  <UserProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UserProvider>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <RootProviders>
        <GlobalStyle />
        <App />
      </RootProviders>
    </Router>
  </StrictMode>
);
