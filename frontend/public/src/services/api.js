import axios from 'axios';

// Configure a URL base da sua API. Altere se o seu back-end rodar em outra porta.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/scales',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, 

});

// Busca todas as escalas
export const getScales = () => apiClient.get('');

// Busca o cronograma mensal de uma escala específica
export const getMonthlySchedule = (id, year, month) => {
  return apiClient.get(`/${id}/schedule?year=${year}&month=${month}`);
};

// Cria uma nova escala
export const createScale = (scaleData) => apiClient.post('', scaleData);

// Atualiza uma escala existente
export const updateScale = (id, scaleData) => apiClient.patch(`/update/${id}`, scaleData);

// Deleta uma escala
export const deleteScale = (id) => apiClient.delete(`/delete/${id}`);