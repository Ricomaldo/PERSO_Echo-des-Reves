import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { UserProvider } from './utils/contexts/UserProvider.jsx';
import { ThemeProvider } from './utils/contexts/ThemeProvider.jsx';
import { FirestoreProvider } from './utils/contexts/FirestoreProvider.jsx';
import { ScrollToTop } from './layout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/global/GlobalStyle';
import App from './App.jsx';

const RootProviders = ({ children }) => {
  return (
    <UserProvider>
      <FirestoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </FirestoreProvider>
    </UserProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <RootProviders>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: '#0c3434',
            color: 'white',
            fontSize: '16px',
          }}
          progressClassName="custom-toast-progress"
        />
        <App />
      </RootProviders>
    </Router>
  </StrictMode>
);
