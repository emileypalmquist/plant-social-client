import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes'


export const addErrors = (errors) => {
    return dispatch => {
        dispatch({ type: ADD_ERROR, payload: errors })
    }
}

export const removeErrors = () => {
    return dispatch => {
        dispatch({ type: REMOVE_ERROR })
    }
}