import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { PhoneReducer } from "../Reducers/PhoneReducer";
import { AppReducer } from "../Reducers/AppReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  PhoneReducer,
  AppReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));