// import action type variables from actiontypes.js
import { ADD_PLANTS, ADD_USER_PLANTS } from '../actionTypes';

const initialState = {
    plants: [],
    userPlants: [],
};

const plantReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLANTS: {
            return {
                ...state,
                plants: action.payload
            }
        }
        case ADD_USER_PLANTS: {
            return {
                ...state,
                userPlants: action.payload
            }
        }

        default:
            return state;
    }
};

export default plantReducer;