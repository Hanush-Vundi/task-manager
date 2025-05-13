// frontend/src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = () => axios.get(API_URL);
export const createTask = (data) => axios.post(API_URL, data);
export const updateTask = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const searchTasks = (query) => axios.get(`${API_URL}/search/q?q=${query}`);
export const getTaskById = (id) => axios.get(`${API_URL}`); // Optional enhancement
