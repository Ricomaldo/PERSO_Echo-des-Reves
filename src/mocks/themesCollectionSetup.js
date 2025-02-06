import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase/firebaseConfig.js';

const themesData = [
  {
    id: 'custom-dark',
    name: 'Thème Sombre Custom',
    author: 'eric',
    darkMode: true,
    colors: {
      primary: '#1E88E5', // Bleu foncé
      secondary: '#D32F2F', // Rouge foncé
      accent: '#FFC107', // Jaune doré
      background: '#121212', // Noir profond
      surface: '#1E1E1E', // Gris foncé
      text: '#E0E0E0', // Gris clair
    },
    typography: {
      fontFamilyH1: "'Orbitron', sans-serif",
      fontFamilyH2: "'Raleway', sans-serif",
      fontFamilyH3: "'Oswald', sans-serif",
      fontFamilyBody: "'Inter', sans-serif",
      fontSizeH1: '26px',
      fontSizeH2: '22px',
      fontSizeH3: '20px',
      fontSizeBody: '18px',
    },
  },
];

// 🔥 Fonction d'ajout des thèmes
const setupThemes = async () => {
  const themesCollection = collection(db, 'themes');

  for (const theme of themesData) {
    const themeRef = doc(themesCollection, theme.id);
    await setDoc(themeRef, theme);
    console.log(`🎨 Thème "${theme.name}" ajouté à Firestore.`);
  }

  console.log('✅ Tous les thèmes ont été ajoutés.');
};

setupThemes().catch((error) =>
  console.error('❌ Erreur lors de l’ajout des thèmes :', error)
);
