import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReduce";
import { packageReducer } from "./reducers/packageReducer";
import { AuthState } from "./types/AuthState";
import { PackageState } from "./types/PackageState";

export type AppState = {
  auth: AuthState,
  package: PackageState

}
const rootReducer = () => combineReducers({
  auth: authReducer,
  package : packageReducer
  
});

export function configureStore(): Store {
    const store = createStore(rootReducer(), undefined, applyMiddleware(thunk));
    return store;
  }