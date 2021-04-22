import {SET_GREENHOUSE} from "../actionTypes"

export const setGreenhouse = (greenhouse) => {
    console.log(greenhouse)
    return {
        type: SET_GREENHOUSE,
        payload: greenhouse
    }
}