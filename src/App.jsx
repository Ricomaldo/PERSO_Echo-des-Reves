import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './layout/Header';
import HeaderLogin from './layout/HeaderLogin';
import Footer from './layout/Footer';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApercuObjectifs from './pages/ApercuObjectifs';
import Calendrier from './pages/Calendrier';
import Configuration from './pages/Configuration';
import ObjectifForm from './pages/ObjectifForm';
import Note from './pages/Note';
import Error from './pages/Error';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {isLoginPage ? <HeaderLogin /> : <Header />}{' '}
      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/objectifs" element={<ApercuObjectifs />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/settings" element={<Configuration />} />
          <Route path="/objectif/:objectifId" element={<ObjectifForm />} />
          <Route path="/note/:noteId" element={<Note />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
