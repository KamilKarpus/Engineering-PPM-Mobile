import { UserData } from "./model/UserData";
import jwt_decode from "jwt-decode";
import { TokenDTO } from "./model/TokenDTO";
import { AsyncStorage } from 'react-native';
const initial : UserData = {
    token: "",
    userEmail: "",
    permissions: []
}

export class TokenManager{
    async getUserData() : Promise<UserData>{
        let token = await AsyncStorage.getItem('token');
        if(token){
            const encodedToken = jwt_decode<TokenDTO>(token);
            return new UserData(token, encodedToken.login, encodedToken.permissions);
        }
        return initial;
    }
    async getToken() : Promise<string>{
        const token = await AsyncStorage.getItem('token');
        return token ? token : "";
    }
    async getRefreshToken() : Promise<string>{
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        return refreshToken ? refreshToken : "";
    }
    async saveToken(token: string, refreshToken: string) : Promise<void>{
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('refreshToken', refreshToken);
    }
    clear() :void{
        AsyncStorage.clear();
    }
}