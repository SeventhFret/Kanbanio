import { api, apiUrl } from "./ApiClient";



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


export function getAvatarPath(avatar) {
    const filePath = avatar.split("/");
    const userAvatarFile = filePath[filePath.length - 1];
    const avatarUrl = apiUrl + '/media/avatars/' + userAvatarFile;

    return avatarUrl
}
