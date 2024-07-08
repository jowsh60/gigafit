import { API_URL } from './config'

export async function loginRequest({ username, password }){
    return fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {

                return response.json()
            } else {

                throw new Error("Incorrect username and/or password")
            }
        })
}

export async function checkEmailUsername( email, username ){
    return fetch(`${API_URL}/available`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            email:email,
            username:username,
        })

    })
    .then(response => response.json())
}

export async function registerRequest(data, token) {
    return fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Register failed")
            }
        })
}

export async function readPreferencesRequest( token ){
    return fetch(`${API_URL}/preferences`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())

}

export async function savePreferencesRequest( preferences, token ){
    return fetch(`${API_URL}/preferences`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            preferences:preferences,
        })

    })
    .then(response => response.json())

}

export async function changePasswordRequest( password, newPassword, token) {
    return fetch(`${API_URL}/changePassword`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            password:password,
            newPassword:newPassword,
        })
    })
    .then(response => response.json())
}