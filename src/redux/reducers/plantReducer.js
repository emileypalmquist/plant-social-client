// import action type variables from actiontypes.js
import { ADD_PLANTS, ADD_USER_PLANTS, SET_USER_PLANT_SHOW, REMOVE_USER_PLANT, ADD_USER_PLANT, ADD_CARE_NOTE } from '../actionTypes';

const initialState = {
    plants: [],
    userPlants: [],
    userPlantShow: {}
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
        case SET_USER_PLANT_SHOW: {
            return {
                ...state,
                userPlantShow: action.payload
            }
        }
        case REMOVE_USER_PLANT: {
            return {
                ...state, 
                userPlants: state.userPlants.filter((p) => p.id !== action.payload)
            }
        }
        case ADD_USER_PLANT: {
            return {
                ...state,
                userPlants: [action.payload, ...state.userPlants]
            }
        }
        case ADD_CARE_NOTE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.user_plant_id ? {...p, care_notes: [...p.care_notes, action.payload]} : p)
            return {
              ...state,
              userPlants: updatedPlants
            }
        }
        default:
            return state;
    }
};

export default plantReducer;