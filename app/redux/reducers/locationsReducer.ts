import { LocationsActions, LOCATIONS_FETCH, LOCATIONS_FETCHED } from "../actions/LocationsActions";
import { LocationsState } from "../types/LocationsState";


const initialState = {
    isLoading: false,
    locations : []
}


export function locationsReducer(state : LocationsState = initialState, actions : LocationsActions){
    switch(actions.type){
        case LOCATIONS_FETCH:{
            return {
                ...state,
                isLoading: true
            }
        }
        case LOCATIONS_FETCHED:{
            return {
                ...state,
                isLoading: false, 
                locations: actions.payload
            }
        }
        default:{
            return state;
        }
    }
}