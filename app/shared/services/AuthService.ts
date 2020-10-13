import { Environment } from "../../Environment";
import { SuccessfulResponse, ErrorResponse, RefreshTokenResponse } from "../model/AuthResponse";

export class AuthService{
    private url: string = Environment.apiUrl;

    public async getCredential(name: string, password: string) : Promise<SuccessfulResponse>{
        const formData = new URLSearchParams();
        formData.append('grant_type', Environment.grantType);
        formData.append('username', name);
        formData.append('password', password);
        formData.append('client_id', Environment.clientId);
        formData.append('client_secret', Environment.clientSecret);
        formData.append('scope', Environment.scope);

        const result = await fetch(`${this.url}/connect/token`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formData.toString()
        }).then(async result=>{
            if(result.ok){
                return result;
            }else{
                const errorMessage = await result.json();
                throw new ErrorResponse(errorMessage.error, errorMessage.error_description);
            }
        });
        return result.json() as Promise<SuccessfulResponse>;
    }

    public async refreshToken(refreshToken: string) : Promise<RefreshTokenResponse>{
        const formData = new URLSearchParams();
        formData.append('grant_type', "refresh_token");
        formData.append("refresh_token", refreshToken);
        formData.append('client_id', Environment.clientId);
        formData.append('client_secret', Environment.clientSecret);
        formData.append('scope', Environment.scope);

        const result = await fetch(`${this.url}/connect/token`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formData.toString()
        }).then(async result=>{
            if(result.ok){
                return result;
            }else{
                const errorMessage = await result.json();
                throw new ErrorResponse(errorMessage.error, errorMessage.error_description);
            }
        });
        return result.json() as Promise<RefreshTokenResponse>;
    }
}