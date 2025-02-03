import React, { useEffect, useState } from 'react';
import { useUser } from '../../utils/contexts/UserProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseConfig';
import { ProgressBar } from '../../components/ProgressBar';
import { Collapse } from '../../components/Collapse';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../layout';
import {
  ObjectivesList,
  ObjectiveItem,
  ObjectiveTitle,
  SessionContent,
  SessionDetail,
} from './dashboardStyles';

function Dashboard() {
  const { activeUser } = useUser();
  const [objectifs, setObjectifs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const navigate = useNavigate();
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

        // Requêtes pour Firestore
        const queryObjectifs = query(
          objectifsCollectionRef,
          where('participant', '==', activeUser.name),
          where('progression', '<', 100)
        );

        const querySessions = query(
          sessionsCollectionRef,
          where('participant', '==', activeUser.name),
          orderBy('date', 'desc')
        );

        const [objectifsSnapshot, sessionsSnapshot] = await Promise.all([
          getDocs(queryObjectifs),
          getDocs(querySessions),
        ]);

        // Objectifs
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

        // Sessions
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

  const handleSelectSession = (session) => {
    navigate(`/session/${session.id}`);
  };

  return (
    <>
      <PageTitle title="Tableau de bord" />

      <Collapse title={`Objectifs pour ${activeUser?.name || ''}`}>
        {isLoading ? (
          <p>Chargement des objectifs...</p>
        ) : objectifs.length === 0 ? (
          <p>
            Aucun objectif en cours pour {activeUser?.name || 'cet utilisateur'}
            .
          </p>
        ) : (
          <ObjectivesList>
            {objectifs.map((objectif) => (
              <ObjectiveItem key={objectif.id}>
                <ObjectiveTitle>{objectif.titre}</ObjectiveTitle>
                <ProgressBar
                  objectifId={objectif.id}
                  progression={objectif.progression}
                  onProgressionChange={handleProgressionChange}
                />
              </ObjectiveItem>
            ))}
          </ObjectivesList>
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
          <SessionContent>
            {sessions[currentSessionIndex] ? (
              <>
                <SessionDetail>
                  <h3>Notes : </h3>
                  {sessions[currentSessionIndex].notes}
                </SessionDetail>
                {sessions[currentSessionIndex].vigilance && (
                  <SessionDetail>
                    <h3>Vigilance : </h3>
                    {sessions[currentSessionIndex].vigilance}
                  </SessionDetail>
                )}
              </>
            ) : (
              <p>Session introuvable.</p>
            )}
          </SessionContent>
        )}
      </Collapse>
    </>
  );
}

export default Dashboard;
