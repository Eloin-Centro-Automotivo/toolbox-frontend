// src/Services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Ajuste conforme necessário

const api = axios.create({
  baseURL: API_BASE_URL,
});

// CRUD para Mechanic
export const getMechanics = () => api.get('/mechanics');
export const getMechanic = (id) => api.get(`/mechanics/${id}`);
export const createMechanic = (data) => api.post('/mechanics', data);
export const updateMechanic = (id, data) => api.put(`/mechanics/${id}`, data);
export const deleteMechanic = (id) => api.delete(`/mechanics/${id}`);

// CRUD para Tool
export const getTools = () => api.get('/tools');
export const getTool = (id) => api.get(`/tools/${id}`);
export const createTool = (data) => api.post('/tools', data);
export const updateTool = (id, data) => api.put(`/tools/${id}`, data);
export const deleteTool = (id) => api.delete(`/tools/${id}`);

// Conferência e Relatórios (já existente)
export const postConference = (data) => api.post('/conference', data);
export const getDailyReport = (date) => api.get(`/reports/daily?date=${date}`);
export const getMissingToolsReport = (date) => api.get(`/reports/missing_tools`, { params: { date }, });


export default api;
