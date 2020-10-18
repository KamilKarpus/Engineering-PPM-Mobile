import { PackageInfo } from "../../model/PackageInfo";
import { PackageCacheItem } from "../../shared/model/PackageCacheItem";

export interface PackageCacheState{
    packages: PackageCacheItem[];
}