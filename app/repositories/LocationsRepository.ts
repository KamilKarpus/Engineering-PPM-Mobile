import { Environment } from "../Environment";
import { LocationInfo } from "../model/LocationInfo";
import AuthClient from "../shared/AuthClient";

export default class LocationsRepository{
    private _client: AuthClient;
    private _baseUrl = `${Environment.apiUrl}/api/locations`
    constructor() {
        this._client = new AuthClient();
    }

    public GetLocationsInfo() : Promise<LocationInfo[]>{
        const url = `${this._baseUrl}/all`;
        return this._client.Get<LocationInfo[]>(url);
    }

}