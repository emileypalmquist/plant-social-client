const token = () => localStorage.token;
const API = process.env.REACT_APP_BACKEND_BASE_URL;

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
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const getUserGreenhouse = (id) => {
  return fetch(API + "/users/" + id, {
    method: "GET",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const createCareNote = (care_note) => {
  return fetch(API + "/care_notes", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ care_note }),
  }).then((resp) => resp.json());
};

const getAllUserPlants = () => {
  return fetch(API + "/user_plants", {
    method: "GET",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const persistUpdateUsersPlant = (id, userPlant) => {
  const formData = new FormData();
  formData.append("name", userPlant.name);
  formData.append("difficulty", userPlant.difficulty);
  formData.append("moisture", userPlant.moisture);
  formData.append("indoor", userPlant.indoor);
  formData.append("plant", userPlant.plant);
  userPlant.photo && formData.append("photo", userPlant.photo);
  console.log(formData);
  return fetch(API + `/user_plants/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    body: formData,
  }).then((resp) => resp.json());
};

// auth fetches

const login = (path, user) => {
  return fetch(API + path, {
    method: "POST",
    headers,
    body: JSON.stringify({ user }),
  }).then((resp) => resp.json());
};

const reAuth = () => {
  return fetch(API + "/re_auth", {
    method: "GET",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const updateUserInfo = (id, user) => {
  return fetch(API + `/users/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({
      user,
    }),
  }).then((resp) => resp.json());
};

const deleteUserPlant = (id) => {
  return fetch(API + `/user_plants/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const createUserPlant = ({
  name,
  difficulty,
  moisture,
  indoor,
  photo,
  userId,
  plant,
}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("moisture", moisture);
  formData.append("indoor", indoor);
  formData.append("user_id", userId);
  formData.append("plant", plant);
  photo && formData.append("photo", photo);

  return fetch(API + "/user_plants", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    body: formData,
  }).then((resp) => resp.json());
};

const deleteCareNote = (id) => {
  return fetch(API + `/care_notes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const createComment = (comment) => {
  return fetch(API + "/comments", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ comment }),
  }).then((resp) => resp.json());
};

const deleteComment = (id) => {
  return fetch(API + `/comments/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const createLike = (like) => {
  return fetch(API + "/likes", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ like }),
  }).then((resp) => resp.json());
};

const deleteLike = (id) => {
  return fetch(API + `/likes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const getPlants = () => {
  return fetch(API + "/plants", {
    method: "GET",
    headers: authHeaders(),
  }).then((resp) => resp.json());
};

const searchForPlantSpecies = (query) => {
  return fetch(API + "/plant-search", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ query }),
  }).then((resp) => resp.json());
};

export const api = {
  auth: {
    login,
    reAuth,
    updateUserInfo,
  },
  plants: {
    getPlants,
    searchForPlantSpecies,
  },
  userPlants: {
    getUserPlant,
    getUserGreenhouse,
    getAllUserPlants,
    deleteUserPlant,
    createUserPlant,
    persistUpdateUsersPlant,
  },
  likes: {
    createLike,
    deleteLike,
  },
  comments: {
    createComment,
    deleteComment,
  },
  careNotes: {
    createCareNote,
    deleteCareNote,
  },
};
