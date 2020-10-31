import { AppState } from "react-native";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import LocationsRepository from "../../../repositories/LocationsRepository";
import { LocationsState } from "../../types/LocationsState";
import { LOCATIONS_FETCH, LOCATIONS_FETCHED } from "../LocationsActions";

export const getLocations = (
) : ThunkAction<void, LocationsState, unknown, Action<any>> => async (dispatch) => {
    await dispatch({
        type: LOCATIONS_FETCH
    });
    const repository = new LocationsRepository();
    await repository.GetLocationsInfo()
    .then(async result=>{
        console.log(result);
        await dispatch({
            type: LOCATIONS_FETCHED,
            payload: result
        })
    }).catch(err=>{
        console.log(err);
    })
}


