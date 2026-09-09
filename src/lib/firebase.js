import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBvHHeZx-EX64msjnus2YBkPv0P9NdIpso",
  authDomain: "agoracr.firebaseapp.com",
  projectId: "agoracr",
  storageBucket: "agoracr.firebasestorage.app",
  messagingSenderId: "145882649707",
  appId: "1:145882649707:web:2b705810eb035b2090cd2e",
  measurementId: "G-VTJLRZ6TMV"
};

export const app = initializeApp(firebaseConfig);

// Inicializar Analytics sólo en entornos compatibles (navegador)
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) analytics = getAnalytics(app);
  });
}
