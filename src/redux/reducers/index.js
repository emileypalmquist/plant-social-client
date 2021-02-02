import { combineReducers } from "redux";

import userReducer from "./userReducer";
import plantReducer from "./plantReducer";
import statusReducer from "./statusReducer"

export default combineReducers({userReducer, plantReducer, statusReducer});