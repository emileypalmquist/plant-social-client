import { LOGIN, SIGN_OUT } from '../actionTypes';

const initialState = {
    username: null,
    zone: null,
    experienceLevel: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                ...action.paylod
            }
        }
        case SIGN_OUT: {
            return {
                initialState
            }
        }
        default:
            return state;
    }
};

export default userReducer;