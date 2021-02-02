import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

const initialState = {
    errors: null,
    loading: true
};

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ERROR: {
            return {
                ...state,
                errors: action.payload
            }
        }
        case REMOVE_ERROR: {
            return {
                ...state,
                errors: null
            }
        }
        default:
            return state;
    }
};

export default statusReducer;