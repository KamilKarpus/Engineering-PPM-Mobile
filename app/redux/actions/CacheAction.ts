import { PackageInfo } from "../../model/PackageInfo";
import { PackageCacheItem } from "../../shared/model/PackageCacheItem";

export const ITEM_ADDED = "ITEM_ADDED";

export interface ItemAddedAction{
    type: typeof ITEM_ADDED;
    payload: PackageCacheItem[];
}

export type CacheActions = ItemAddedAction; 
