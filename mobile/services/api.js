import axios from "axios";

// Remplace par ton IP locale (ex: http://192.168.1.10:3000/api) pour tester sur téléphone/simulateur 
// "localhost" ne fonctionne pas depuis un appareil physique/émulateur.
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
