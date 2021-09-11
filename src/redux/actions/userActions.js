// import action type variables from actiontypes.js
import {
  SET_USER,
  SIGN_OUT,
  ADD_ERROR,
  REMOVE_ERROR,
  ADD_USER_PLANT,
  REMOVE_USER_PLANT,
  SET_LOADING,
  UPDATE_USER_PLANT,
} from "../actionTypes";
import { api } from "../../services/api";

export const login = (e, user, path, history) => {
  e.preventDefault();

  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    api.auth
      .login(path, user)
      .then((data) => {
        if (data.user) {
          localStorage.setItem("token", data.jwt);
          console.log(data.user);
          dispatch({ type: SET_USER, payload: data.user });
          dispatch({ type: SET_LOADING, payload: false });
          dispatch({ type: REMOVE_ERROR });
          history.push("community-garden");
        } else {
          dispatch({ type: ADD_ERROR, payload: data.messages });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const reAuth = () => {
  return (dispatch) => {
    api.auth
      .reAuth()
      .then((data) => {
        if (data.user) {
          dispatch({ type: SET_USER, payload: data.user });
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

export const newUserPlant = (info, history) => {
  return (dispatch) => {
    api.userPlants
      .createUserPlant(info)
      .then((data) => {
        if (!data.user_plant) {
          dispatch({ type: ADD_ERROR, paylod: data.messages });
        } else {
          dispatch({ type: REMOVE_ERROR });
          dispatch({ type: ADD_USER_PLANT, payload: data.user_plant });
          history.push(`/greenhouse/${info.userId}`);
        }
      })
      .catch(console.log);
  };
};

export const deleteUserPlant = (e, id) => {
  e.stopPropagation();

  return (dispatch) => {
    api.userPlants
      .deleteUserPlant(id)
      .then((data) => {
        dispatch({ type: ADD_ERROR, payload: data.messages });
        dispatch({ type: REMOVE_USER_PLANT, payload: id });
      })
      .catch(console.log);
  };
};

export const updateUserPlant = (e, id, userPlant, history) => {
  e.preventDefault();
  return (dispatch) => {
    api.userPlants.persistUpdateUsersPlant(id, userPlant).then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_USER_PLANT, payload: data });
        history.push(`/user_plant/${id}`);
      }
    });
  };
};

export const updateUser = (e, id, user, history) => {
  e.preventDefault();
  return (dispatch) => {
    api.auth.updateUserInfo(id, user).then((data) => {
      if (!data.error) {
        dispatch({ type: SET_USER, payload: data });
        history.push(`/greenhouse/${id}`);
      }
    });
  };
};
