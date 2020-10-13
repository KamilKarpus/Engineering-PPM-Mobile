import { AuthState } from "../../types/AuthState";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { REQUEST_LOGIN, LOGGED_IN, ERROR } from "../../actions/AuthAction";
import { AuthService } from "../../../shared/services/AuthService";
import { TokenManager } from "../../../shared/TokenManager";


export const getCredientials = (
    userEmail: string, password: string
  ): ThunkAction<void, AuthState, unknown, Action<any>> => async (dispatch) => {
       await dispatch({
           type: REQUEST_LOGIN
       });
       const service = new AuthService();
       const manager = new TokenManager();
       await service.getCredential(userEmail, password).then(async credential=>{
           await manager.saveToken(credential.access_token, credential.refresh_token);
           console.log(credential);
           const userData = await manager.getUserData();
           await dispatch({
                type: LOGGED_IN,
                payload: userData
           });
       }).catch(async err=>{
           console.log(err);
           await dispatch({
               type: ERROR
           })
       })
  }