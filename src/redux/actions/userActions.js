// import action type variables from actiontypes.js
import {
  LOGIN,
  SIGN_OUT,
  ADD_ERROR,
  REMOVE_ERROR,
  ADD_USER_PLANT,
  REMOVE_USER_PLANT,
} from "../actionTypes";

const API = process.env.REACT_APP_BACKEND_BASE_URL;
const token = localStorage.token;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const authHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const login = (e, user, path, history) => {
  e.preventDefault();

  return (dispatch) => {
    fetch(API + path, {
      method: "POST",
      headers,
      body: JSON.stringify({ user }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("token", data.jwt);

          dispatch({ type: LOGIN, payload: data.user });
          dispatch({ type: REMOVE_ERROR });
          history.push("community-garden");
        } else {
          console.log(data.messages);
          dispatch({ type: ADD_ERROR, payload: data.messages });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const reAuth = () => {
  return (dispatch) => {
    fetch(API + "/re_auth", {
      method: "GET",
      headers: authHeaders,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.user) {
          dispatch({ type: LOGIN, payload: data.user });
          dispatch({ type: REMOVE_ERROR });
        } else {
          dispatch({ type: ADD_ERROR, payload: data.messages });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: SIGN_OUT });
  };
};

export const newUserPlant = (
  history,
  name,
  difficulty,
  moisture,
  indoor,
  photo,
  userId,
  plantId
) => {
  const token = localStorage.token;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("moisture", moisture);
  formData.append("indoor", indoor);
  formData.append("user_id", userId);
  formData.append("plant_id", plantId);
  photo && formData.append("photo", photo);

  return (dispatch) => {
    fetch(API + "/user_plants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.messages) {
          dispatch({ type: ADD_ERROR, paylod: data.messages });
        } else {
          dispatch({ type: REMOVE_ERROR });
          dispatch({ type: ADD_USER_PLANT, payload: data.user_plant });
          history.push(`/greenhouse/${userId}`);
        }
      })
      .catch(console.log);
  };
};

export const deleteUserPlant = (e, id) => {
  e.stopPropagation();

  return (dispatch) => {
    fetch(API + `/user_plants/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: REMOVE_USER_PLANT, payload: id });
        dispatch({ type: ADD_ERROR, payload: data.messages });
      })
      .catch(console.log);
  };
};
