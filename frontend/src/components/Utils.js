import { useEffect, useState } from "react";
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


export function getUsersNotes() {
    let userNotes = [];

    api.get("/notes/", {
        headers: {
            Authorization: "JWT " + localStorage.getItem("access")
        }
    })
    .then(res => {userNotes = res.json()})
    .catch(error => {userNotes = false})


    return userNotes
}


export function getUsersTodos() {
    let userTodos;

    api.get("/todo/", {
        headers: {
            Authorization: "JWT " + localStorage.getItem("access")
        }
    })
    .then(res => {userTodos = res.data})
    .catch(error => {userTodos = false})

    return userTodos
}

export function useUsersFolders({type}) {
    let requestUrl = "/folder/";
    const [folders, setFolders] = useState();

    if (type === "N") {
        requestUrl = requestUrl + "?type=N";
    } else if (type === "T") {
        requestUrl = requestUrl + "?type=T";
    }

    api.get(requestUrl, {
        headers: {
            Authorization: "JWT " + localStorage.getItem("access")
        }
    })
    .then(res => {setFolders(res.data)})
    .catch(error => {setFolders([])})


    return folders

}