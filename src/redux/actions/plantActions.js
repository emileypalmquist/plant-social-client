import { ADD_USER_PLANTS, ADD_ERROR, REMOVE_ERROR, SET_USER_PLANT_SHOW, ADD_CARE_NOTE, REMOVE_CARE_NOTE, ADD_COMMENT, REMOVE_COMMENT } from "../actionTypes";
import {api} from "../../services/api"

export const setPlants = () => {
  return (dispatch) => {
    api.userPlants.getAllUserPlants()
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

export const  removeCareNote = (id, userPlantId) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_CARE_NOTE,
      payload: {id, userPlantId}
    })
  }
}


export const addCommentToUserPlant = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment
  }
}

export const removeComment = (id, userPlantId) => {
  return {
    type: REMOVE_COMMENT,
    payload: {id, userPlantId}
  }
}

// export const getAllPlants = () => {
//   console.log("get all plants");
// };
