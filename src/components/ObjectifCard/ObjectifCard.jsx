import React from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '../../components/Button';
import {
  ObjectiveItem,
  ObjectiveTitle,
  StarDisplay,
} from './objectifCardStyles';

const ObjectifCard = ({ objectif, onProgressionChange, onDelete, onEdit }) => {
  return (
    <ObjectiveItem>
      <ObjectiveTitle>{objectif.titre}</ObjectiveTitle>
      <StarDisplay>
        {[...Array(objectif.etoiles)].map((_, index) => (
          <i key={index} className="fa fa-star filled" />
        ))}
      </StarDisplay>
      <ProgressBar
        objectifId={objectif.id}
        progression={objectif.progression}
        onProgressionChange={onProgressionChange}
      />
      {onEdit && (
        <Button $variant="primary" onClick={() => onEdit(objectif)}>
          Modifier
        </Button>
      )}
      {onDelete && (
        <Button $variant="delete" onClick={() => onDelete(objectif.id)}>
          Supprimer
        </Button>
      )}
    </ObjectiveItem>
  );
};

export default ObjectifCard;
