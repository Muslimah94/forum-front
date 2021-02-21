import { combineReducers } from "redux";
import forumReducer from "./forum/";
import commentsReducer from "./comments";
import auth from "./auth/";
import customizer from "./customizer/";

const rootReducer = combineReducers({
  forumApp: forumReducer,
  comments: commentsReducer,
  auth: auth,
  customizer: customizer,
});

export default rootReducer;
