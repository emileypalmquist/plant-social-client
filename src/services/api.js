const token = () => localStorage.token
const API = process.env.REACT_APP_BACKEND_BASE_URL

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
  
const authHeaders = () => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token()}`,
});


// userPlant fetches
const getUserPlant = (id) => {
    return fetch(API + `/user_plants/${id}`, {
        method: "GET",
        headers: authHeaders()
    }).then(resp => resp.json())
}

const getUserGreenhouse = (id) => {
    return fetch(API + "/users/" + id, {
        method: "GET",
        headers: authHeaders()
      })
        .then((resp) => resp.json())
}

const createCareNote = (care_note) => {
    return fetch(API + "/care_notes", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({care_note}),
    })
        .then(resp => resp.json())
}

const getAllUserPlants = () => {
    return fetch(API + "/user_plants", {
        method: "GET",
        headers: authHeaders()
      })
        .then((resp) => resp.json())
}


// auth fetches

const login = (path, user) => {
    return fetch(API + path, {
        method: "POST",
        headers,
        body: JSON.stringify({ user }),
      })
        .then((resp) => resp.json())
}

const reAuth = () => {
    return fetch(API + "/re_auth", {
        method: "GET",
        headers: authHeaders(),
      })
        .then((resp) => resp.json())
}

const deleteUserPlant = (id) => {
    return fetch(API + `/user_plants/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
        .then((resp) => resp.json())
    
} 

const createUserPlant = ({
    name,
    difficulty,
    moisture,
    indoor,
    photo,
    userId,
    plantId
  }) => {
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("difficulty", difficulty);
    formData.append("moisture", moisture);
    formData.append("indoor", indoor);
    formData.append("user_id", userId);
    formData.append("plant_id", plantId);
    photo && formData.append("photo", photo);
  
    return fetch(API + "/user_plants", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      })
        .then((resp) => resp.json())
}

export const api = {
    auth: {
        login, reAuth
    },
    plants: {},
    userPlants: {
        getUserPlant,
        getUserGreenhouse,
        createCareNote,
        getAllUserPlants,
        deleteUserPlant,
        createUserPlant
    }
    
}