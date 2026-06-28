import { API_URL } from "../Utils/constants";
import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})

export const getUser = async () => {
    try {
        const response = await api.get('/')
        return response.data
    } catch (error) {
        console.error("Error fetching user:", error)
        throw error
    }
}

export const createUser = async (userData) => {
    try {
        const response = await api.post('/', userData)
        return response.data
    } catch (error) {
        console.error("Error creating user:", error)
        throw error
    }
}

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/${id}`, userData);
        return response.data
    } catch (error) {
        console.log('Error Update user', error)
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/${id}`)
        return response.data
    } catch (error) {
        console.log('Error deleting user', error)
        throw error
    }
}
