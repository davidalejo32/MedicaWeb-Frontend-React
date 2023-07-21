import axios from 'axios'

const API = 'http://localhost:8080'


export const createSpecialty = data => axios.post(`${API}/specialties`, data)
export const getSpecialty = () => axios.get(`${API}/specialties`)