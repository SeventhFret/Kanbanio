import { api } from "./ApiClient";


export function getRefreshToken() {
    api.post("/users/token/refresh/", {
        refresh: localStorage.getItem("refresh")
    })
    .then(resp => {
        localStorage.setItem("access", resp.data['access']);
        localStorage.setItem("refresh", resp.data['refresh']);
    })
    .catch(error => {
        localStorage.clear();
    })
}

