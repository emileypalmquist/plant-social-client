import {
  LOGIN,
  SIGN_OUT,
  ADD_USER_PLANT,
  REMOVE_USER_PLANT,
} from "../actionTypes";

const initialState = {
  username: null,
  zone: null,
  experience_level: null,
  id: null,
  favorite_plant_species: [],
  user_plants: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SIGN_OUT: {
      return initialState;
    }
    case ADD_USER_PLANT: {
      return {
        ...state,
        user_plants: [...state.user_plants, action.payload],
      };
    }
    case REMOVE_USER_PLANT: {
      console.log(action.payload);
      return {
        ...state,
        user_plants: state.user_plants.filter((p) => p.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default userReducer;
