import { combineReducers } from "redux";

import userReducer from "./userReducer";
import plantReducer from "./plantReducer";
import statusReducer from "./statusReducer"
import greenhouseReducer from "./greenhouseReducer"

export default combineReducers({userReducer, plantReducer, statusReducer, greenhouseReducer});