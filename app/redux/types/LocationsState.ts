import { LocationInfo } from "../../model/LocationInfo";

export interface LocationsState{
    isLoading: boolean;
    locations : LocationInfo[]
}