import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAMRZ9XTk2tQ0erwkH6Z6nsAY8mlJiJCyI',
  authDomain: 'echodesreves-55484.firebaseapp.com',
  projectId: 'echodesreves-55484',
  storageBucket: 'echodesreves-55484.firebasestorage.app',
  messagingSenderId: '1045743649044',
  appId: '1:1045743649044:web:3cdca072730b9aad9ac201',
  measurementId: 'G-3GYJDXK5VR',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
export default app;
