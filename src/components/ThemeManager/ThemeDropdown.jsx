import React from 'react';

const ThemeDropdown = ({ themes, selectedThemeId, onChange }) => {
  console.log('📌 ThemeDropdown reçoit :', themes);
  return (
    <div>
      <select
        id="theme-dropdown"
        value={selectedThemeId || ''} // ✅ Sélectionne le bon thème
        onChange={(e) => onChange(e.target.value)}
      >
        {/* 🚀 Option d'invitation si aucun thème n'est sélectionné */}
        {!selectedThemeId && (
          <option value="" disabled>
            🎨 Choisir un thème...
          </option>
        )}

        {/* 🔥 Ajout des thèmes Firestore */}
        {Object.entries(themes || {}).map(([id, theme]) => (
          <option key={id} value={id}>
            {theme.name || id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeDropdown;
