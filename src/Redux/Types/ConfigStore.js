import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { PhoneReducer } from "../Reducers/PhoneReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  PhoneReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));