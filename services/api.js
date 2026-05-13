import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://amma-backend-r0d7.onrender.com/api';

// Fonction utilitaire pour les requêtes
const request = async (endpoint, method = 'GET', body = null, needAuth = true) => {
  const headers = { 'Content-Type': 'application/json' };

  if (needAuth) {
    const token = await AsyncStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur serveur');
  }

  return data;
};

// Auth
export const inscription = (form) =>
  request('/auth/inscription', 'POST', form, false);

export const connexion = (matricule, motDePasse) =>
  request('/auth/connexion', 'POST', { matricule, motDePasse }, false);

// Élèves
export const getEleves = (classe_id) =>
  request(`/eleves/${classe_id}`);

export const ajouterEleve = (data) =>
  request('/eleves', 'POST', data);

export const ajouterNote = (eleve_id, matiere, note) =>
  request(`/eleves/${eleve_id}/notes`, 'POST', { matiere, note });