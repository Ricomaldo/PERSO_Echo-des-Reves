import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import app from './utils/firebaseConfig';

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
import Adventure from './adventure/Adventure';

console.log('Connexion établie avec Firebase :', app);

function App() {
  const location = useLocation();
  const params = useParams(); // Récupère les paramètres dynamiques (si présents)
  const isLoginPage = location.pathname === '/';

  // Définir des titres par défaut pour chaque page
  const pages = {
    '/': 'Page de Connexion',
    '/dashboard': 'Tableau de Bord',
    '/objectifs': 'Résumé des Objectifs',
    '/calendrier': 'Calendrier',
    '/settings': 'Configuration',
    '/Adventure': 'Mission',
    '*': 'Erreur',
  };

  // Gérer les titres dynamiques pour les pages avec paramètres
  let pageTitle;

  if (location.pathname.startsWith('/objectif/')) {
    pageTitle = "Focus sur l'objectif";
  } else if (location.pathname.startsWith('/session')) {
    pageTitle = params.id
      ? `Modifier Session ${params.id}`
      : 'Nouvelle Session';
  } else {
    // Pour les autres pages, récupérer le titre par défaut
    pageTitle = pages[location.pathname] || 'Page inconnue';
  }

  return (
    <>
      {isLoginPage ? <HeaderLogin title="" /> : <Header title={pageTitle} />}
      <main className="content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/objectifs" element={<ObjectifsOverview />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/settings" element={<Configuration />} />
          <Route path="/objectif/:id" element={<ObjectifForm />} />
          <Route path="/session/:id" element={<SessionForm />} />
          <Route path="/Adventure" element={<Adventure />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
