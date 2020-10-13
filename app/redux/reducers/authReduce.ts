import { AuthState } from './../types/AuthState';
import { AuthActions, REQUEST_LOGIN, LOGGED_IN, ERROR, LOGOUT } from "./../actions/AuthAction";
import { TokenManager } from "../../shared/TokenManager";
const initial : AuthState = {
    isLoading: false,
    userEmail: "",
    token: "",
    permissions: [],
    hasError: false
}
export function authReducer(state: AuthState = initial, action : AuthActions){
    switch(action.type){
       case REQUEST_LOGIN:{
           return {
               ...state,
               isLoading: true,
               hasError: false
           }
       }
       case LOGGED_IN:{
           return{
               ...state,
               isLoading: false,
               userEmail: action.payload.userEmail,
               token: action.payload.token,
               permissions: action.payload.permissions
           }
       }
       case ERROR:{
           return{
               ...state,
               isLoading: false,
               hasError: true,
           }
       }
       case LOGOUT:{
            return{
               ...state,
               userEmail: "",
               token: "",
               permissions: []
            }
       }
        default:{
            return state;
        }
    }
}