import axios from 'axios';

export const apiUrl = "https://vmd108176.contaboserver.net";
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