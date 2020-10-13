import { UserData } from "../../shared/model/UserData";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGGED_IN = "LOGGED_IN";
export const ERROR = "ERROR";
export const LOGOUT = "LOGOUT";
export interface RequestLoginAction{
    type: typeof REQUEST_LOGIN;
}
export interface LoggedInAction{
    type: typeof LOGGED_IN;
    payload: UserData;
}
export interface Error{
    type: typeof ERROR;
    payload: string;
}
export interface LogoutAction{
    type: typeof LOGOUT;
}
export type AuthActions = RequestLoginAction | LoggedInAction | Error | LogoutAction;