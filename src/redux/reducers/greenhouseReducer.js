import { SET_GREENHOUSE } from '../actionTypes';

const initialState = {
   greenhouse: {
       username: null,
       zone: null,
       experience_level: null,
       id: null,
       favorite_plant_species: [],
        user_plants: []
   }
};

const greenhouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GREENHOUSE: {
            return {
                ...state,
                greenhouse: action.payload
            }
        }
        default:
            return state;
    }
};

export default greenhouseReducer;