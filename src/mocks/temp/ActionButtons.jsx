import React from 'react';
import { Button, ButtonGroup } from '../../components/Button';

const ActionButtons = ({
  onSave,
  onReset,
  onSetFavorite,
  mode,
  isNewTheme,
  toggleNewThemeMode,
  newThemeName,
  setNewThemeName,
}) => (
  <ButtonGroup>
    {/* Mode Création d'un nouveau thème */}
    {isNewTheme ? (
      <>
        {/* 📝 Champ pour nommer le nouveau thème */}
        <input
          type="text"
          placeholder="Nom du nouveau thème"
          value={newThemeName}
          onChange={(e) => setNewThemeName(e.target.value)}
        />
        <Button
          onClick={onSave}
          $variant="primary"
          disabled={!newThemeName.trim()} // Désactiver si le nom est vide
        >
          ➕ Créer le thème
        </Button>
        <Button onClick={toggleNewThemeMode} $variant="secondary">
          ❌ Annuler
        </Button>
      </>
    ) : (
      <>
        {/* Gestion des thèmes existants */}
        <Button onClick={toggleNewThemeMode} $variant="accent">
          ➕ Nouveau thème
        </Button>
        <Button onClick={onReset} $variant="secondary">
          🔄 Réinitialiser
        </Button>
        <Button onClick={onSave} $variant="primary">
          💾 Sauvegarder
        </Button>
        <Button onClick={onSetFavorite} $variant="accent">
          ⭐ Favori {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      </>
    )}
  </ButtonGroup>
);

export default ActionButtons;
