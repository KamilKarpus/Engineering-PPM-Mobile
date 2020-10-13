import { Environment } from "../Environment";
import { ResponseId } from "../model/ResponseId";
import { TransferRequest } from "../model/TransferRequest";
import AuthClient from "../shared/AuthClient";

export default class TransferRepository{
    private _client: AuthClient;
    private _baseUrl = `${Environment.apiUrl}/api/transfer`

    constructor(){
        this._client = new AuthClient();
    }

    public AddTranferRequest(request : TransferRequest) : Promise<ResponseId>{
        return this._client.Post<TransferRequest, ResponseId>(this._baseUrl, request);
    }

    public Finisih(requestId : string) : Promise<void>{
        return this._client.PutWihoutBody(`${this._baseUrl}/${requestId}`);
    }
}