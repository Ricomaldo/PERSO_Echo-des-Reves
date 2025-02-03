import { Routes, Route, useLocation } from 'react-router-dom';
import app from './utils/firebase/firebaseConfig';

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

function App() {
  const location = useLocation();

  // Détermine si la page actuelle est la page de connexion
  const isLoginPage = location.pathname === '/';

  return (
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
  );
}

export default App;
