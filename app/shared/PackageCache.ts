import { AsyncStorage } from "react-native";
import { PackageInfo } from "../model/PackageInfo";
import { PackageCacheItem } from "./model/PackageCacheItem";

export class PackageCache{

    private keyItem : string = "package_key";

    public async SavePackage(packageToAdd: PackageInfo) : Promise<void>{
        var packages = await AsyncStorage.getItem(this.keyItem);
        var itemToAdd = new PackageCacheItem(packageToAdd.packageId, packageToAdd.number,
            packageToAdd.orderId, packageToAdd.companyName, packageToAdd.orderNumber,
            packageToAdd.orderYear, new Date());

        if(packages == null){
            var packagesCollection = [];
            packagesCollection.push(itemToAdd);
            await AsyncStorage.setItem(this.keyItem, JSON.stringify(packagesCollection));
        }else{
            var solidCollection = JSON.parse(packages);

            await AsyncStorage.removeItem(this.keyItem);
            if(solidCollection.length <= 10){
                
                this.CollectionHandle(solidCollection, itemToAdd);
            
            }else{
                solidCollection.sort((a : PackageCacheItem,b : PackageCacheItem)=>{
            
                    return a.addedDate.getTime() - b.addedDate.getTime();
                });
                solidCollection.splice(0,1);
                this.CollectionHandle(solidCollection, itemToAdd);

            }
            await AsyncStorage.setItem(this.keyItem, JSON.stringify(solidCollection));
        }
    }
    public async GetPackages() : Promise<PackageCacheItem[]>{
        var packages = await AsyncStorage.getItem(this.keyItem);
        if(packages != null){
            return JSON.parse(packages) as Promise<PackageCacheItem[]>;
        }
        return [];
    }
    private CollectionHandle(array : PackageCacheItem[], itemToAdd : PackageCacheItem) : Array<PackageCacheItem>{
        var result = array.find(p=>p.packageId === itemToAdd.packageId);
        if(result === null || result === undefined){
            array.push(itemToAdd);
        }
        return array;

    }
}