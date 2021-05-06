import { ADD_PLANTS, ADD_USER_PLANTS, ADD_ERROR, REMOVE_ERROR, SET_USER_PLANT_SHOW, ADD_CARE_NOTE, REMOVE_CARE_NOTE, ADD_COMMENT, REMOVE_COMMENT, ADD_USER_PLANT_LIKE, REMOVE_USER_PLANT_LIKE, ADD_CARE_NOTE_LIKE, REMOVE_CARE_NOTE_LIKE, ADD_COMMENT_LIKE, REMOVE_COMMENT_LIKE, SET_LOADING } from "../actionTypes";
import {api} from "../../services/api"

export const setUserPlants = () => {
  return (dispatch) => {
    api.userPlants.getAllUserPlants()
      .then((data) => {
        if (data.messages) {
          dispatch({ type: ADD_ERROR, payload: data.messages });
        } else {
          dispatch({ type: REMOVE_ERROR });
          dispatch({type: SET_LOADING, payload: false })
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

export const addUserPlantLike = (like) => {
  return {
    type: ADD_USER_PLANT_LIKE,
    payload: like
  }
}

export const removeUserPlantLike = (like) => {
  return {
    type: REMOVE_USER_PLANT_LIKE,
    payload: like
  }
}

export const addCareNoteLike = (like, userPlantId) => {
  return {
    type: ADD_CARE_NOTE_LIKE,
    payload: {like, userPlantId}
  }
}

export const removeCareNoteLike = (like, userPlantId) => {
  return {
    type: REMOVE_CARE_NOTE_LIKE,
    payload: {like, userPlantId}
  }
}

export const addCommentLike = (like, userPlantId) => {
  return {
    type: ADD_COMMENT_LIKE,
    payload: {like, userPlantId}
  }
}

export const removeCommentLike = (like, userPlantId) => { 
  return {
    type: REMOVE_COMMENT_LIKE,
    payload: {like, userPlantId}
  }
}

export const setAllPlants = (plants) => {
  return {
    type: ADD_PLANTS,
    payload: plants
  }
};
