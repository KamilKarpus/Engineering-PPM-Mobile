import { ErrorResponse } from "./ErrorResponse";
import { TokenManager } from "./TokenManager";

const POST = "POST";
const GET = "GET";
const PUT = "PUT";
const DELETE = "DELETE";

export class HttpClient{
    private tokenManager: TokenManager;

    constructor(){
        this.tokenManager = new TokenManager();
    }
    public async Post<Body, Response>(url : string, body : Body) : Promise<Response> {
        const result = await fetch(url, {
            method: POST,
            body: JSON.stringify(body),
            headers:{'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await this.tokenManager.getToken() }
            }).then(async result=>{
                if(result.ok){
                    return result;
                }else{
                    const errorMessage = await result.json();
                    throw new ErrorResponse(errorMessage.errorCode, errorMessage.message);
                }
            })
        return await result.json() as Promise<Response>;
        
    }
    public async Get<Response>(url : string) : Promise<Response>{
        const result = await fetch(url,{
            method: GET,
            headers:{'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await this.tokenManager.getToken()}
        }).then(async result=>{
            if(result.ok){
                return result;
            }else{
                const errorMessage = await result.json();
                throw new ErrorResponse(errorMessage.errorCode, errorMessage.message);
            }
        })
        return await result.json() as Promise<Response>;
    }
    public async Put<Body>(url: string, body: Body){
            await fetch(url, {
                method: PUT,
                body: JSON.stringify(body),
                headers:{'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await this.tokenManager.getToken()}
            }).then(async result=>{
                if(!result.ok){
                    const errorMessage = await result.json();
                    throw new ErrorResponse(errorMessage.errorCode, errorMessage.message);
                }
            })
    }

    public async PutWihoutBody(url: string){
        await fetch(url, {
            method: PUT,
            headers:{'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await this.tokenManager.getToken()}
        }).then(async result=>{
            if(!result.ok){
                const errorMessage = await result.json();
                throw new ErrorResponse(errorMessage.errorCode, errorMessage.message);
            }
        })
}
}