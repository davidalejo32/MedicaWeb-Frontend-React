import axios from 'axios'

const API = 'http://localhost:8080'


export const createDoctor = data => axios.post(`${API}/doctors`, data)
export const getDoctors = () => axios.get(`${API}/doctors`)