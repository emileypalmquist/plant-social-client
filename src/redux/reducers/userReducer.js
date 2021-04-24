import {
  LOGIN,
  SIGN_OUT,
  ADD_USER_PLANT,
  REMOVE_USER_PLANT,
  ADD_CARE_NOTE
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
      return {
        ...state,
        user_plants: state.user_plants.filter((p) => p.id !== action.payload),
      };
    }
    case ADD_CARE_NOTE: {
      const updatedPlants = state.user_plants.map(p => p.id === action.payload.user_plant_id ? {...p, care_notes: [...p.care_notes, action.payload]} : p)
      return {
        ...state,
        user_plants: updatedPlants
      }
    }
    default:
      return state;
  }
};

export default userReducer;
