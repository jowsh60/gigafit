import {API_URL,fsID,fsSecret} from './config'

export async function nutritionRequest( token, food, branded ){
    return fetch(`${API_URL}/nutrition`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            food:food,
            branded:branded
        })
    })
    .then(response => response.json())
}

export async function nutritionSearchRequest( token, food ){
    //Proxy call to the api to hopefully go around nutritionix's user limit
    return fetch(`${API_URL}/nutrition?query=${food}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
    })
    .then(response => response.json())
}
