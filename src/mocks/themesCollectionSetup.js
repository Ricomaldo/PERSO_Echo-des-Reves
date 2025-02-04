import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase/firebaseConfig.js';

const setupThemesCollection = async () => {
  try {
    const themeRef = doc(collection(db, 'themes'), 'test-theme');
    await setDoc(themeRef, {
      id: 'test-theme',
      name: 'Sunset Glow',
      author: 'eric',
      primary: '#ff5733',
      secondary: '#c70039',
      accent: '#ffc300',
      background: '#900c3f',
      surface: '#581845',
      text: '#ffffff',
      darkMofe: false,
    });

    const preferenceRef = doc(collection(db, 'preferences'), 'eric');
    await setDoc(preferenceRef, {
      user: 'eric',
      favoriteThemes: { light: 'test-theme', dark: 'default-dark' },
      savedColors: ['#FF5733', '#C70039', '#FFC300', '#900C3F'],
    });
    console.log('Données initialisées avec succès!', themeRef, preferenceRef);
  } catch (error) {
    console.error("Erreur lors de l'initilisation de Firestore", error);
  }
};

setupThemesCollection();
