import {API_URL} from './config'

export async function historyRequest( date, token ){
    return fetch(`${API_URL}/history?date=${date}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())

}

export async function counterRequest( date, token ){
    return fetch(`${API_URL}/counter?date=${date}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())

}

export async function macroRequest( date, token ){
    return fetch(`${API_URL}/macros?date=${date}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())

}