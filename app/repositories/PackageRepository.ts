import { Environment } from "../Environment";
import { LocationInfo } from "../model/LocationInfo";
import { PackageInfo } from "../model/PackageInfo";
import AuthClient from "../shared/AuthClient";

export default class PackageRepository{
    private _client: AuthClient;
    private _baseUrl = `${Environment.apiUrl}/api/orders`
    constructor() {
        this._client = new AuthClient();
    }

    public GetPackageInfo(orderId: string, packageId: string) : Promise<PackageInfo>{
        const url = `${this._baseUrl}/${orderId}/package/${packageId}`;
        return this._client.Get<PackageInfo>(url);
    }

    public GetPackageRecomendation(packageId: string) : Promise<LocationInfo>{
        const url = `${Environment.apiUrl}/api/packages/${packageId}/recommendation`;
        return this._client.Get<LocationInfo>(url);
    }

}