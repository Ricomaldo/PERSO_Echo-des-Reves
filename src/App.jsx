import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './layout/Header';
import HeaderLogin from './layout/HeaderLogin';
import Footer from './layout/Footer';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Calendrier from './pages/Calendrier';
import Configuration from './pages/Configuration';
import ObjectifForm from './pages/ObjectifForm';
import SessionForm from './pages/SessionForm';
import Error from './pages/Error';
import ObjectifsOverview from './pages/ObjectifsOverview';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const pages = {
    '/': 'Page de Connexion',
    '/dashboard': 'Tableau de Bord',
    '/objectifs': 'Résumé des Objectifs',
    '/calendrier': 'Calendrier',
    '/settings': 'Configuration',
    '/objectif': 'Nouvel Objectif',
    '/session': 'Nouvelle Session',
    '*': 'Erreur',
  };
  const pageTitle = pages[location.pathname] || 'Page inconnue';
  return (
    <>
      {isLoginPage ? <HeaderLogin title="" /> : <Header title={pageTitle} />}{' '}
      <main className="content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/objectifs" element={<ObjectifsOverview />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/settings" element={<Configuration />} />
          <Route path="/objectif" element={<ObjectifForm />} />
          <Route path="/session" element={<SessionForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
