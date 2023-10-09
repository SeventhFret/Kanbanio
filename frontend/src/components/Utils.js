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



export const useApiNotes = (noteChanged) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        api.get("/notes/", {
            headers: {
                "Authorization": "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setNotes(res.data)})
        .catch(error => {console.log(error);})

    }, [noteChanged])

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


export function useApiGetFolders(type, folderChanged) {
    const [folders, setFolders] = useState([]);
    const requestUrl = "/folder/?type=" + type;
    
    useEffect(() => {
        api.get(requestUrl, {
            headers: {
                Authorization: "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setFolders(res.data)})
        .catch(error => {console.log(error)})
    }, [requestUrl, folderChanged]);
    
    return folders
}

export function apiDeleteTodo(todoId) {
    const deleteUrl = "/todo/" + todoId;

    api.delete(deleteUrl, {
        headers: {
            Authorization: "JWT " +  localStorage.getItem("access")
        }
    })
    .then(res => {console.log(res);})
    .catch(err => {console.log(err);})
}

export function useApiGetTodos(todosChanged) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        api.get("/todo/", {
            headers: {
                Authorization: "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setTodos(res.data)})
        .catch(error => {setTodos(false)})    
    }, [todosChanged])

    return todos

}


export function apiUpdateTodo(todoId, updatedTodoData) {
    const patchUrl = "/todo/" + todoId + "/";

    api.patch(patchUrl, updatedTodoData, {
        headers: {
            Authorization: 'JWT ' + localStorage.getItem("access")
        },
    })
    .then(res => {window.location.reload();})
    .catch(error => {console.log(error);})
}

export function apiCreateTodo(newTaskData) {
    api.post("/todo/", newTaskData, {
        headers: {
            "Authorization": "JWT " + localStorage.getItem("access")
        }
    })
    .then(res => {console.log(res)})
    .catch(error => {console.log(error)})
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

export function apiDeleteNote(noteId) {
    const deleteUrl = "/notes/" + noteId + "/";
    
    api.delete(deleteUrl, {
        headers: {
            Authorization: "JWT " + localStorage.getItem('access')
        }
    })
    .then(res => {console.log(res.data);})
    .catch(error => {console.log(error);})
    
}


export function apiUpdateNote(noteData) {

    const patchUrl = "/notes/" + noteData.id + "/";
    
    api.patch(patchUrl, noteData, {
        headers: {
            Authorization: "JWT " + localStorage.getItem('access')
        }
    })
    .then(res => {console.log(res.data);})
    .catch(error => {console.log(error);})
}

export function apiCreateNote(noteData) {
    api.post("/notes/", noteData, {
        headers: {
            Authorization: "JWT " + localStorage.getItem('access')
        }
    })
    .then(res => {console.log(res.data);})
    .catch(error => {console.log(error);})
}

export function apiUpdateFolder(folderData) {
    const updateUrl = "/folder/" + folderData.id + "/"
    
    api.patch(updateUrl, folderData, {
        headers: {
            Authorization: "JWT " + localStorage.getItem('access')
        }
    })
    .then(res => {console.log(res.data);})
    .catch(error => {console.log(error);})
}

export function apiDeleteFolder(folderId) {
    const deleteUrl = "/folder/" + folderId + "/"
    
    api.delete(deleteUrl, {
        headers: {
            Authorization: "JWT " + localStorage.getItem('access')
        }
    })
    .then(res => {console.log(res.data);})
    .catch(error => {console.log(error);})
}