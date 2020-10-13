import { TransferRequest } from "../../model/TransferRequest";
import { FETCHED_PACKAGE, FETCHED_RECOMMENDATION, FETCHING_DATA, PackageActions, REQUEST_TRANSFER, TRANSFER_FINISHED } from "../actions/PackageActions";
import { PackageState } from "../types/PackageState";

const initialState = {
    isLoading: false,
    package: {
        packageId: "",
        flowId: "",
        flowName: "",
        weight: 0,
        height: 0,
        width: 0,
        length: 0,
        number: 0,
        progress: 0,
        orderId: "",
        companyName: "",
        orderedDate: new Date(0,0,0),
        deliveryDate:new Date(0,0,0),
        orderNumber: 0,
        orderYear:  0,
        locatioName: "",
        locationId: ""
    },
    recommendedLocation:{
        id: "",
        name: "",
        shortName: "",
        locationType: 0
    },
    isTransferLoading: false
    
}

export function packageReducer(state: PackageState = initialState, action : PackageActions){
    switch(action.type){
        case FETCHING_DATA:{
            return{
                ...state,
                isLoading: true
            }
        }
        case FETCHED_PACKAGE:{
            return{
                ...state,
                isLoading: false,
                package: action.payload
            }
        }
        case FETCHED_RECOMMENDATION:{
            return {
                ...state,
                isLoading: false,
                recommendedLocation: action.payload
            }
        }
        case REQUEST_TRANSFER:{
            return{
                ...state,
                isTransferLoading: true
            }
        }
        case TRANSFER_FINISHED:{
            return{
                ...state,
                isTransferLoading: false
            }
        }
        default:{
            return state;
        }
    }
}