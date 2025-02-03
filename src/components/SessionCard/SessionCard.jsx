import React from 'react';
import { Button } from '../../components/Button';
import { SessionContent, SessionDetail } from './sessionCardStyles';

const SessionCard = ({ session, onEdit, onNavigate }) => {
  return (
    <SessionContent>
      <SessionDetail>
        <h3>Date :</h3>
        {new Date(session.date.seconds * 1000).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </SessionDetail>
      <SessionDetail>
        <h3>Notes :</h3>
        {session.notes || 'Aucune note disponible'}
      </SessionDetail>
      {session.vigilance && (
        <SessionDetail>
          <h3>Vigilance :</h3>
          {session.vigilance}
        </SessionDetail>
      )}
      <div>
        {onEdit && (
          <Button $variant="primary" onClick={() => onEdit(session.id)}>
            Modifier
          </Button>
        )}
        {onNavigate && (
          <Button $variant="secondary" onClick={() => onNavigate(session.id)}>
            Voir
          </Button>
        )}
      </div>
    </SessionContent>
  );
};

export default SessionCard;
