import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { TransferRequest } from "../../../model/TransferRequest";
import PackageRepository from "../../../repositories/PackageRepository";
import PackageRepistory from "../../../repositories/PackageRepository";
import TransferRepository from "../../../repositories/TransferRepository";
import { AuthState } from "../../types/AuthState";
import { FETCHED_PACKAGE, FETCHED_RECOMMENDATION, FETCHING_DATA, REQUEST_TRANSFER, TRANSFER_FINISHED } from "../PackageActions";

export const fetchPackage = (
    orderId: string, packageId: string
  ): ThunkAction<void, AuthState, unknown, Action<any>> => async (dispatch) => {
        await dispatch({
            type: FETCHING_DATA
        });
        const repository = new PackageRepository();
        await repository.GetPackageInfo(orderId, packageId)
        .then(async result => {
            await dispatch({
                type: FETCHED_PACKAGE,
                payload: result 
            });
        }).catch(err=>{
            console.log(err);
        });
  }

export const getRecommendation = (
    packageId: string
) : ThunkAction<void, AuthState, unknown, Action<any>> => async (dispatch) => {
    await dispatch({
        type:FETCHING_DATA
    });
    const repository = new PackageRepository();
    await repository.GetPackageRecomendation(packageId)
    .then(async result=>{
        await dispatch({
            type: FETCHED_RECOMMENDATION,
            payload: result
        })
    }).catch(err=>{
        console.log(err);
    })
}

export const tranferRequestCreate = (
    packageId: string, locationId: string, toLocationId: string
) : ThunkAction<void, AuthState, unknown, Action<any>> => async (dispatch) => {
    await dispatch({
        type: REQUEST_TRANSFER
    });
    const repository = new TransferRepository();
    await repository.AddTranferRequest(new TransferRequest(packageId, locationId, toLocationId))
    .then(async result=>{
        repository.Finisih(result.id)
            .then(async () =>{
                await dispatch({
                    type: TRANSFER_FINISHED
                })
            })
    });
}