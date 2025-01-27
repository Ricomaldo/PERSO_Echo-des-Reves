import React, { useState } from 'react';
import AddMissionReport from './AddMissionReport';
import MissionForm from './MissionForm';
import MissionHub from './MissionHub';
import MissionList from './MissionList';
import UpdateMissionForm from './UpdateMissionForm';

const Adventure = () => {
  const [selectedMission, setSelectedMission] = useState(null);

  // Fonction pour sélectionner une mission depuis la liste
  const handleSelectMission = (mission) => {
    setSelectedMission(mission); // Définit la mission sélectionnée pour la mise à jour
  };

  return (
    <>
      <MissionHub>
        <h1>-- Base des données Rebelles --</h1>
        <AddMissionReport />
      </MissionHub>

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
    <button onClick={() => setSelectedMission(null)} style={{ marginTop: '16px' }}>
      Annuler la mise à jour
    </button>
  </MissionHub>
)}
    </>
  );
};

export default Adventure;