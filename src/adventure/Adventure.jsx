import React from 'react';
import styled, { keyframes } from 'styled-components';
import Frame from '../layout/Frame';
import AddMissionReport from './AddMissionReport';
import MissionForm from './MissionForm';
import MissionHub from './MissionHub';

const Adventure = () => {
  return (
    <Frame>
      {' '}
      <MissionHub>
        <h1>-- Base des données Rebelles --</h1>
        <AddMissionReport />
      </MissionHub>
      <MissionHub>
        <h1>-- Archives des Missions Rebelles --</h1>
        <MissionForm />
      </MissionHub>
    </Frame>
  );
};

export default Adventure;
