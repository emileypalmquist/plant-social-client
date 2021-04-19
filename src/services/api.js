const token = () => localStorage.token
const API = process.env.REACT_APP_BACKEND_BASE_URL

const getUserPlant = (id) => {
    return fetch(API + `/user_plants/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token()}`
        }
    }).then(resp => resp.json())
}



export const api = {
    auth: {
    },
    plants: {},
    userPlants: {
        getUserPlant
    }
}