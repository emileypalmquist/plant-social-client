import { LOGIN, SIGN_OUT } from '../actionTypes';

const initialState = {
    username: null,
    zone: null,
    experience_level: null,
    id: null,
    favorite_plant_species: [],
    user_plants: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                ...action.payload
            }
        }
        case SIGN_OUT: {
            return initialState
        }
        default:
            return state;
    }
};

export default userReducer;