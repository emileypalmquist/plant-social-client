import { ADD_USER_PLANTS, ADD_ERROR, REMOVE_ERROR, SET_USER_PLANT_SHOW, ADD_CARE_NOTE } from "../actionTypes";

const API = process.env.REACT_APP_BACKEND_BASE_URL;

export const setPlants = () => {
  const token = localStorage.token;

  return (dispatch) => {
    fetch(API + "/user_plants", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.messages) {
          dispatch({ type: ADD_ERROR, payload: data.messages });
        } else {
          dispatch({ type: REMOVE_ERROR });
          dispatch({ type: ADD_USER_PLANTS, payload: data });
        }
      })
      .catch(console.log);
  };
};

export const setUserPlantShow = (userPlant) => {
  return {
    type: SET_USER_PLANT_SHOW,
    payload: userPlant
  }
}

export const addCareNoteToUserPlant = (careNote) => {
  return {
    type: ADD_CARE_NOTE,
    payload: careNote
  }
}


export const getAllPlants = () => {
  console.log("get all plants");
};
