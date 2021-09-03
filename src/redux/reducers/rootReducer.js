import { combineReducers } from "redux";
import main from "./main";
import userReducer from "../../containers/Login/reducer";

const rootReducer = combineReducers({
  main,
  user: userReducer,
});

export default rootReducer;
