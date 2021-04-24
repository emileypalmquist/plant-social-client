import {SET_GREENHOUSE, RESET_GREENHOUSE} from "../actionTypes"

export const setGreenhouse = (greenhouse) => {
    return {
        type: SET_GREENHOUSE,
        payload: greenhouse
    }
}

export const resetGreenhouse = () => {
    return {
        type: RESET_GREENHOUSE,
    }
}