import React from 'react';

const ThemeDropdown = ({ themes, selectedThemeId, onChange }) => {
  return (
    <div>
      <select
        id="theme-dropdown"
        value={selectedThemeId || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          🎨 Choisir un thème...
        </option>
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
