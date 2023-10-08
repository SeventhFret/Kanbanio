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
    console.log('Obtained token');

}


export function getAvatarPath(avatar) {
    const filePath = avatar.split("/");
    const userAvatarFile = filePath[filePath.length - 1];
    const avatarUrl = apiUrl + '/media/avatars/' + userAvatarFile;

    return avatarUrl
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


export function useApiTodos() {
    const [userTodos, setUserTodos] = useState([]);

    useEffect(() => {
        api.get("/todo/", {
            headers: {
                Authorization: "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setUserTodos(res.data)})
        .catch(error => {console.log(error)})
    }, [])

    return userTodos
}


export function useUsersFolders(type) {
    const [folders, setFolders] = useState([]);
    const requestUrl = "/folder/?type=" + type;
    
    useEffect(() => {
        api.get(requestUrl, {
            headers: {
                Authorization: "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setFolders(res.data)})
        .catch(error => {console.log(error);})
    }, [requestUrl]);
    
    return folders
}


export function useApiCreateFolder(folderData) {

    return () => {
        api.post("/folder/", folderData, {
            headers: {
                Authorization: "JWT " + localStorage.getItem('access')
            }
        })
        .then(res => {console.log(res.data);})
        .catch(error => {console.log(error);})
    }
    
}

export function useApiDeleteFolder(folderId) {
    
}


export function useApiUpdateNote() {

    return (noteData) => {
        const patchUrl = "/notes/" + noteData.id + "/";
        
        api.patch(patchUrl, noteData, {
            headers: {
                Authorization: "JWT " + localStorage.getItem('access')
            }
        })
        .then(res => {console.log(res.data);})
        .catch(error => {console.log(error);})
    }
}