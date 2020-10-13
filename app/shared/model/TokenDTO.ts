export interface TokenDTO {
    nbf: number;
    exp: number;
    iss: string;
    client_id: string;
    sub: string;
    auth_time: number;
    idp: string;
    permissions: string[];
    login: string;
    jti: string;
    iat: number;
    scope: string[];
    amr: string[];
}