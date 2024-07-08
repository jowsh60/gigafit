import {API_URL} from './config'

export async function readFoodRequest( date, token ){
    return fetch(`${API_URL}/food?date=${date}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())

}

export async function addFoodRequest( date, foods, totals, token ) {
    return fetch(`${API_URL}/food`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            date:date,
            foods:foods,
            totals:totals
        })
    })
    .then(response => response.json())
}

export async function readDayRequest( date, token ){
    return fetch(`${API_URL}/day?date=${date}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())

}

export async function addDayRequest( date, day, token ){
    return fetch(`${API_URL}/day`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            date:date,
            day:day,
        })

    })
    .then(response => response.json())

}