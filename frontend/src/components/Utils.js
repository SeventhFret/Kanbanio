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



export const useApiNotesFolders = () => {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        api.get("/folder/?type=N", {
            headers: {
                "Authorization": "JWT " + localStorage.getItem('access')
            }
        })
        .then(res => {setFolders(res.data)})
        .catch(error => {console.log(error);})
    }, [])

    return folders;

  }

export const useApiNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        api.get("/notes/", {
            headers: {
                "Authorization": "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setNotes(res.data)})
        .catch(error => {console.log(error);})

    }, [])
    
    return notes

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