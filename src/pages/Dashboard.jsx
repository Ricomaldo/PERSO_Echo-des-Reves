import React, { useEffect, useState } from 'react';
import { useUser } from '../utils/contexts/UserProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import ProgressBar from '../components/ProgressBar';
import Collapse from '../components/Collapse';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styled from 'styled-components';

function Dashboard() {
  const { activeUser } = useUser();
  const [objectifs, setObjectifs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!activeUser || !activeUser.name) {
          console.log('Utilisateur actif non défini ou sans nom.');
          setIsLoading(false);
          return;
        }

        const objectifsCollectionRef = collection(db, 'Objectifs');
        const sessionsCollectionRef = collection(db, 'Sessions');

        // Requête pour les objectifs en cours
        const queryObjectifs = query(
          objectifsCollectionRef,
          where('participant', '==', activeUser.name),
          where('progression', '<', 100)
        );

        // Requête pour la dernière session
        const querySessions = query(
          sessionsCollectionRef,
          where('participant', '==', activeUser.name),
          orderBy('date', 'desc')
        );

        // Exécuter les deux requêtes en parallèle
        const [objectifsSnapshot, sessionsSnapshot] = await Promise.all([
          getDocs(queryObjectifs),
          getDocs(querySessions),
        ]);

        // Traiter les objectifs
        if (!objectifsSnapshot.empty) {
          const objectifs = objectifsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setObjectifs(objectifs);
        } else {
          setObjectifs([]);
          console.log(`Aucun objectif en cours pour ${activeUser.name}.`);
        }

        // Traiter les sessions
        if (!sessionsSnapshot.empty) {
          const sessions = sessionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSessions(sessions);
        } else {
          setSessions([]);
          console.log(`Aucune session trouvée pour ${activeUser.name}.`);
        }
      } catch (e) {
        console.error('Erreur lors de la récupération des données :', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeUser]);

  const handleProgressionChange = (objectifId, newProgression) => {
    setObjectifs((prevObjectifs) =>
      prevObjectifs.map((objectif) =>
        objectif.id === objectifId
          ? { ...objectif, progression: newProgression }
          : objectif
      )
    );
  };

  const navigate = useNavigate();

  // const handleSelectObjectif = (objectif) => {
  //   navigate(`/objectif/${objectif.id}`);
  // };

  const handleSelectSession = (session) => {
    navigate(`/session/${session.id}`);
  };

  return (
    <>
      {/* Collapse pour les objectifs */}
      <Collapse title={`Objectifs pour ${activeUser?.name || ''}`}>
        {isLoading ? (
          <p>Chargement des objectifs...</p>
        ) : objectifs.length === 0 ? (
          <p>
            Aucun objectif en cours pour {activeUser?.name || 'cet utilisateur'}
            .
          </p>
        ) : (
          <ul>
            {objectifs.map((objectif) => (
              <li
                key={objectif.id}
                style={{
                  marginBottom: '16px',
                  border: '2px solid #222627',
                  padding: '4px',
                  borderRadius: '4px',
                }}
              >
                <h3 style={{ marginBottom: '8px' }}>{objectif.titre}</h3>
                <ProgressBar
                  objectifId={objectif.id}
                  progression={objectif.progression}
                  onProgressionChange={handleProgressionChange}
                />
              </li>
            ))}
          </ul>
        )}
      </Collapse>

      <Collapse
        title={`Session du ${
          sessions.length > 0 && sessions[currentSessionIndex]
            ? new Date(
                sessions[currentSessionIndex].date.seconds * 1000
              ).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : 'Aucune session récente'
        }`}
      >
        {sessions.length === 0 ? (
          <p>Aucune session récente trouvée.</p>
        ) : (
          <>
            {/* Vérifie si une session existe à l'index courant */}
            {sessions[currentSessionIndex] ? (
              <>
                {/* Navigation avec les flèches */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: `240px`,
                    height: '32px',
                  }}
                >
                  {/* Flèche gauche */}
                  <Button
                    $variant="secondary"
                    onClick={() =>
                      setCurrentSessionIndex((prev) =>
                        Math.min(prev + 1, sessions.length - 1)
                      )
                    } // Empêche d'aller au-delà de la dernière session
                    disabled={currentSessionIndex === sessions.length - 1}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </Button>

                  {/* Flèche droite */}
                  <Button
                    $variant="secondary"
                    onClick={() =>
                      setCurrentSessionIndex((prev) => Math.max(prev - 1, 0))
                    } // Empêche d'aller en dessous de 0
                    disabled={currentSessionIndex === 0}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </Button>
                </div>
                <p
                  style={{ marginTop: '8px' }}
                  onClick={() =>
                    handleSelectSession(sessions[currentSessionIndex])
                  }
                >
                  {sessions[currentSessionIndex].notes}
                </p>
              </>
            ) : (
              <p>Session introuvable.</p>
            )}
          </>
        )}
      </Collapse>
    </>
  );
}

export default Dashboard;
