import axios from 'axios';

const API_URL = 'http://localhost:3006/tasks'; 

export const getTasks = () => axios.get(API_URL);
export const getTaskById = (id) => axios.get(`${API_URL}/${id}`);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const completeTask = (id) => axios.put(`${API_URL}/${id}/complete`);