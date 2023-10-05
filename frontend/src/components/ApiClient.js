import axios from 'axios';

export const apiUrl = "http://localhost:8000";
export const api = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + 
        localStorage.getItem("access"),
        "Content-Type": "application/json",
        "accept": "application/json"
    }
});