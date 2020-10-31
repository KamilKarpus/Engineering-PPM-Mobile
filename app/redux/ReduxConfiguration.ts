import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReduce";
import { cacheReducer } from "./reducers/cacheReducer";
import { locationsReducer } from "./reducers/locationsReducer";
import { packageReducer } from "./reducers/packageReducer";
import { AuthState } from "./types/AuthState";
import { PackageCacheState } from "./types/CacheState";
import { LocationsState } from "./types/LocationsState";
import { PackageState } from "./types/PackageState";

export type AppState = {
  auth: AuthState,
  package: PackageState,
  cache: PackageCacheState,
  locations : LocationsState

}
const rootReducer = () => combineReducers({
  auth: authReducer,
  package : packageReducer,
  cache: cacheReducer,
  locations: locationsReducer
});

export function configureStore(): Store {
    const store = createStore(rootReducer(), undefined, applyMiddleware(thunk));
    return store;
  }