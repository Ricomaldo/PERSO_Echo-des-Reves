import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useFirestore } from './utils/contexts/FirestoreProvider';

import { Header, Footer } from './layout/';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { Historique } from './pages/Historique';
import { Configuration } from './pages/Configuration';
import { ObjectifForm } from './pages/ObjectifForm';
import { SessionForm } from './pages/SessionForm';
import { ErrorPage } from './pages/ErrorPage';
import { ObjectifsOverview } from './pages/ObjectifsOverview';
import { Adventure } from './mocks/adventure/';
import { LoaderScreen } from './components/LoaderScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const { isLoading } = useFirestore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowLoader(false), 500); // Transition fluide
    } else {
      setShowLoader(true);
    }
  }, [isLoading]);

  return (
    <ErrorBoundary>
      {showLoader ? (
        <LoaderScreen isLoading={true} />
      ) : (
        <>
          <Header isLoginPage={isLoginPage} />
          <main className="content">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/objectifs" element={<ObjectifsOverview />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/settings" element={<Configuration />} />
              <Route path="/objectif/:id" element={<ObjectifForm />} />
              <Route path="/session/:id" element={<SessionForm />} />
              <Route path="/Adventure" element={<Adventure />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          {!isLoginPage && <Footer />}
        </>
      )}
    </ErrorBoundary>
  );
}

export default App;
