import React, { useState } from 'react';
import AddMissionReport from './AddMissionReport';
import MissionForm from './MissionForm';
import MissionHub from './MissionHub';
import MissionList from './MissionList';
import UpdateMissionForm from './UpdateMissionForm';
import styled, { keyframes } from 'styled-components';

// Définition de l'animation du défilement
const scroll = keyframes`
  0% {
    transform: translateY(62%);
  }
  100% {
    transform: translateY(-138%);
  }
`;

// Conteneur principal avec perspective
const StyledContainer = styled.div`
  perspective: 400px;
  // overflow: hidden;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  z-index: -1;
`;

// Texte stylisé avec animation
const StyledText = styled.div`
  transform-origin: 50% 100%;
  animation: ${scroll} 60s linear infinite;
  transform: rotateX(25deg);
  text-align: center;
  width: 80%;
  line-height: 1.6;

  p {
    color: #00ff00;
    font-family: 'Orbitron', sans-serif;
    font-size: 20px;
    margin: 0 auto; /* Assure le centrage horizontal */
    width: 100%; /* Les paragraphes prennent la largeur du parent */
  }
`;

const Adventure = () => {
  const [selectedMission, setSelectedMission] = useState(null);

  // Fonction pour sélectionner une mission depuis la liste
  const handleSelectMission = (mission) => {
    setSelectedMission(mission); // Définit la mission sélectionnée pour la mise à jour
  };

  return (
    <>
      <StyledContainer>
        <StyledText>
          <p>
            Jeune Padawan, un grand pouvoir sommeille dans les profondeurs de
            Firebase.
          </p>
          <p>
            Une force mystérieuse attend d’être maîtrisée. Ton apprentissage te
            mènera à explorer des territoires inconnus, où chaque ligne de code
            est une brique de ton futur savoir.
          </p>
          <p>
            Ta mission est simple : plonger dans cet univers, y chercher des
            réponses et y forger tes compétences.
          </p>
          <p>
            Tu découvriras des outils puissants, manipuleras des données et
            construiras des passerelles entre l’imaginaire et la réalité.
          </p>
          <p>
            Mais attention, chaque pas te rapprochera d’un nouveau défi. Chaque
            réussite sera un pas vers la maîtrise totale.
          </p>
          <p>
            Seras-tu prêt à suivre cette voie ? Le destin est entre tes mains.
          </p>
        </StyledText>
      </StyledContainer>
      {/* <MissionHub>
        <h1>-- Base des données Rebelles --</h1>
        <AddMissionReport />
      </MissionHub> */}

      <MissionHub>
        <h1>-- Archives des Missions Rebelles --</h1>
        <MissionForm />
      </MissionHub>

      <MissionHub>
        <h1>-- Liste des Comptes-Rendus Rebelles --</h1>
        <MissionList onSelectMission={handleSelectMission} />
      </MissionHub>

      {selectedMission && (
        <MissionHub>
          <h1>-- Mise à jour des Comptes-Rendus Rebelles --</h1>
          <UpdateMissionForm
            key={selectedMission.id}
            missionId={selectedMission.id}
            initialData={{
              titre: selectedMission.titre,
              description: selectedMission.description,
            }}
          />
          <button
            onClick={() => setSelectedMission(null)}
            style={{ marginTop: '16px' }}
          >
            Annuler la mise à jour
          </button>
        </MissionHub>
      )}
    </>
  );
};

export default Adventure;
