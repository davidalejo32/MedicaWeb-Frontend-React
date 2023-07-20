import axios from 'axios'

const API = 'http://localhost:8080'


export const createUser = data => axios.post(`${API}/users`, data)
export const getUser = () => axios.get(`${API}/users`)