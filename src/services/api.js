const token = () => localStorage.token
const API = process.env.REACT_APP_BACKEND_BASE_URL

// const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
// };
  
const authHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token()}`,
};

const getUserPlant = (id) => {
    return fetch(API + `/user_plants/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token()}`
        }
    }).then(resp => resp.json())
}

const getUserGreenhouse = (id) => {
    return fetch(API + "/users/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token(),
        },
      })
        .then((resp) => resp.json())
}

const createCareNote = (care_note) => {
    return fetch(API + "/care_notes", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({care_note}),
    })
        .then(resp => resp.json())
}


export const api = {
    auth: {
    },
    plants: {},
    userPlants: {
        getUserPlant,
        getUserGreenhouse,
        createCareNote
    }
}