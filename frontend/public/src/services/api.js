import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/scales',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Busca todas as escalas
export const getScales = () => apiClient.get('/');

// Busca o cronograma mensal de uma escala específica
export const getMonthlySchedule = (id, year, month) => {
  return apiClient.get(`/${id}/schedule`, {
    params: {
      year,
      month,
    },
  });
};

// Cria uma nova escala
export const createScale = (scaleData) => apiClient.post('/', scaleData);


