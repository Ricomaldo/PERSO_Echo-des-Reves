import React from 'react';

const FontSelector = ({ label }) => {
  return (
    <div>
      <label>{label}</label>
      <select>
        {/* Polices disponibles */}
        {[
          'Pacifico',
          'Caveat',
          'Inter',
          'Orbitron',
          'Merriweather',
          'Poppins',
          'Playfair Display',
          'Roboto',
          'Raleway',
          'Lora',
          'Oswald',
          'Fira Sans',
        ].map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
