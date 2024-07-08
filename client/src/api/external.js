import {API_URL,fsID,fsSecret} from './config'

async function getToken(){
    return fetch(`${API_URL}/token`, {
        method : 'GET',
    })
    .then(response => response.json())
}

export async function nutritionRequest( food ){
    return await getToken()
    // return fetch(`https://api.api-ninjas.com/v1/nutrition?query=${food}`, {
    //     method: "GET",
    //     headers: {
    //         'X-Api-Key': '',
    //     }
    // })
    // .then(response => response.json())
}
