import { ADD_ERROR, REMOVE_ERROR, SET_LOADING} from '../actionTypes'


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

export const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload 
    }
}