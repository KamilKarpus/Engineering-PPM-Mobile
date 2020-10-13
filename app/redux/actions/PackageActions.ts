import { LocationInfo } from "../../model/LocationInfo";
import { PackageInfo } from "../../model/PackageInfo";

export const FETCHING_DATA = "FETCHING_DATA";
export const FETCHED_PACKAGE = "FETCHED_PACKAGE";
export const FETCHED_RECOMMENDATION = "FETCHED_RECOMMENDATION";
export const REQUEST_TRANSFER = "REQUEST_TRANSFER";
export const TRANSFER_FINISHED = "TRANSFER_FINISHED";

export interface FetchingData{
    type: typeof FETCHING_DATA;
}

export interface FetchedPackage{
    type: typeof FETCHED_PACKAGE;
    payload: PackageInfo;
}

export interface FetchedRecommendation {
    type: typeof FETCHED_RECOMMENDATION;
    payload: LocationInfo;
}

export interface RequestTransfer{
    type: typeof REQUEST_TRANSFER;
}

export interface TranferFinished{
    type: typeof TRANSFER_FINISHED;
}

export type PackageActions = FetchingData | FetchedPackage | FetchedRecommendation | RequestTransfer | TranferFinished;