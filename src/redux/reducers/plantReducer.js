// import action type variables from actiontypes.js
import { ADD_PLANTS, ADD_USER_PLANTS, SET_USER_PLANT_SHOW, REMOVE_USER_PLANT, ADD_USER_PLANT, ADD_CARE_NOTE, REMOVE_CARE_NOTE, ADD_COMMENT, REMOVE_COMMENT, ADD_USER_PLANT_LIKE, REMOVE_USER_PLANT_LIKE, ADD_CARE_NOTE_LIKE, REMOVE_CARE_NOTE_LIKE, ADD_COMMENT_LIKE, REMOVE_COMMENT_LIKE } from '../actionTypes';

const initialState = {
    plants: [],
    userPlants: [],
    userPlantShow: {},
    commentsShow: [],
    careNotesShow: []
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
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.user_plant_id ? {...p, care_notes: [action.payload, ...p.care_notes]} : p)
            return {
              ...state,
              userPlants: updatedPlants
            }
        }
        case REMOVE_CARE_NOTE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.userPlantId ? {...p, care_notes: p.care_notes.filter(cn => cn.id !== action.payload.id)} : p)
            return {
                ...state,
                userPlants: updatedPlants
            }
        }
           case ADD_COMMENT: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.user_plant_id ? {...p, comments: [action.payload, ...p.comments]} : p)
            return {
              ...state,
              userPlants: updatedPlants
            }
        }
        case REMOVE_COMMENT: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.userPlantId ? {...p, comments: p.comments.filter(cm => cm.id !== action.payload.id)} : p)
            return {
                ...state,
                userPlants: updatedPlants
            }
        }
        case ADD_USER_PLANT_LIKE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.likeable_id ? {...p, likes: [action.payload, ...p.likes]} : p)
            return {
              ...state,
              userPlants: updatedPlants
            }
        }
        case REMOVE_USER_PLANT_LIKE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.likeable_id ? {...p, likes: p.likes.filter(l => l.id !== action.payload.id)} : p)
            return {
                ...state,
                userPlants: updatedPlants
            }
        }
        case ADD_CARE_NOTE_LIKE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.userPlantId ? {...p, care_notes: p.care_notes.map(cn => cn.id === action.payload.like.likeable_id ? {...cn, likes: [...cn.likes, action.payload.like]} : cn) } : p)
            return {
                ...state,
                userPlants: updatedPlants
            }  
        }
        case REMOVE_CARE_NOTE_LIKE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.userPlantId ? {...p, care_notes: p.care_notes.map(cn => cn.id === action.payload.like.likeable_id ? {...cn, likes: cn.likes.filter(l => l.id !== action.payload.like.id)} : cn) } : p)
            return {
                ...state,
                userPlants: updatedPlants
            }
        }
        case ADD_COMMENT_LIKE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.userPlantId ? {...p, comments: p.comments.map(cm => cm.id === action.payload.like.likeable_id ? {...cm, likes: [...cm.likes, action.payload.like]} : cm) } : p)
            return {
                ...state,
                userPlants: updatedPlants
            }
        }
        case REMOVE_COMMENT_LIKE: {
            const updatedPlants = state.userPlants.map(p => p.id === action.payload.userPlantId ? {...p, comments: p.comments.map(cm => cm.id === action.payload.like.likeable_id ? {...cm, likes: cm.likes.filter(l => l.id !== action.payload.like.id)} : cm) } : p)
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