import React from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '../../components/Button';
import {
  ObjectiveItem,
  ObjectiveTitle,
  StarDisplay,
} from './objectifCardStyles';

const ObjectifCard = ({ objectif, onDelete, onEdit, showTitle = true }) => {
  if (!objectif || !objectif.id) {
    console.warn('⚠️ Objectif non valide:', objectif);
    return null;
  }
  return (
    <ObjectiveItem>
      {showTitle && <ObjectiveTitle>{objectif.titre}</ObjectiveTitle>}
      <StarDisplay>
        {[...Array(objectif.etoiles)].map((_, index) => (
          <i
            key={index}
            className={`fa ${
              objectif.progression === 100
                ? 'fa-solid fa-star'
                : 'fa-regular fa-star'
            }`}
          />
        ))}
      </StarDisplay>
      {/* ✅ Vérification avant d'afficher la ProgressBar */}
      {objectif.progression !== undefined && (
        <ProgressBar objectif={objectif} />
      )}
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
