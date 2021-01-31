import { ADD_ERROR } from '../actionTypes';

const initialState = {
    error: null,
    loading: true
};

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state;
    }
};

export default statusReducer;