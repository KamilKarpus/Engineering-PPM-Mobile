import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReduce";
import { cacheReducer } from "./reducers/cacheReducer";
import { packageReducer } from "./reducers/packageReducer";
import { AuthState } from "./types/AuthState";
import { PackageCacheState } from "./types/CacheState";
import { PackageState } from "./types/PackageState";

export type AppState = {
  auth: AuthState,
  package: PackageState,
  cache: PackageCacheState

}
const rootReducer = () => combineReducers({
  auth: authReducer,
  package : packageReducer,
  cache: cacheReducer
});

export function configureStore(): Store {
    const store = createStore(rootReducer(), undefined, applyMiddleware(thunk));
    return store;
  }