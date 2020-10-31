import { LocationInfo } from "../../model/LocationInfo";

export const LOCATIONS_FETCH = "LOCATIONS_FETCH";
export const LOCATIONS_FETCHED = "LOCATIONS_FETCHED";

export interface LocationFetchActions{
    type: typeof LOCATIONS_FETCH;
}

export interface LocationsFetchedActions{
    type: typeof LOCATIONS_FETCHED;
    payload: LocationInfo[];
}

export type LocationsActions = LocationFetchActions | LocationsFetchedActions;