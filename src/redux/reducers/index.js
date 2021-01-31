import { combineReducers } from "redux";

import userReducer from "./userReducer";
import plantReducer from "./plantReducer";

export default combineReducers({userReducer, plantReducer});