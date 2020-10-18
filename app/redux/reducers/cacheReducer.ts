import { CacheActions, ITEM_ADDED } from "../actions/CacheAction";
import { PackageCacheState } from "../types/CacheState";

const initialState ={
    packages: []
}

export function cacheReducer(state: PackageCacheState = initialState, action : CacheActions){
    switch(action.type){
        case ITEM_ADDED:{
            return{
                ...state,
                packages: action.payload
            }
        }
        default:{
            return state;
        }
    }
}