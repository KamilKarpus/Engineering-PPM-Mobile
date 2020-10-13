export interface SuccessfulResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    scope: string;
}

export class ErrorResponse extends Error{ 
public error: string;
public errorDescription: string;
constructor(error: string, error_description: string){
    super(error_description);
    this.error = error;
    this.errorDescription = error_description;
}
}

export interface RefreshTokenResponse {
id_token: string;
access_token: string;
expires_in: number;
token_type: string;
refresh_token: string;
scope: string;
}