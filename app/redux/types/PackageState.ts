import { LocationInfo } from "../../model/LocationInfo";
import { PackageInfo } from "../../model/PackageInfo";

export interface PackageState{
    package: PackageInfo;
    isLoading: boolean;
    recommendedLocation : LocationInfo;
    isTransferLoading: boolean;
    needFetch: boolean;
}