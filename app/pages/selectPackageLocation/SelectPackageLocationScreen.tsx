import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { LocationInfo } from '../../model/LocationInfo';
import { fetchPackage, getRecommendation, tranferRequestCreate } from '../../redux/actions/thunkActions/Package-ThunkActions';
import { AppState } from '../../redux/ReduxConfiguration';
import Icon from 'react-native-vector-icons/Feather';
import MessageScreen from '../messageScreen/MessageScreen';
import { PackageInfo } from '../../model/PackageInfo';
import LoadingSpinner from '../../components/common/LoadingSpinner';
type ParamList = {
    Recommendation: {
        packageId: string;
    }
}

interface StateProps{
    isTransferLoading: boolean;
    location: LocationInfo;
    package: PackageInfo;
    isLoading : boolean;
    needFetch: boolean;
}

interface DispatchProps{
    loadRecommendation(packageId : string) : void;
    tranferLocation(packageId: string,fromLocationId: string,toLocationId: string) : void;
    loadPackage(orderId: string, packageId : string) : void;
}

type Props = StateProps & DispatchProps;

const SelectPackegeLocationScreen = (props : Props) =>{

    const [isOpen, setOpen] = React.useState(false);
    const [recommendationEnabled, setRec] = React.useState(false);
    const navigation = useNavigation();
    const onYes = ()=>{
        props.tranferLocation(props.package.packageId, props.package.locationId,
            props.location.id);

    };


    useEffect(()=>{
        if(props.needFetch){
            onClose();
            navigation.goBack();
        }
    }, [props.needFetch])


    const onClose = ()=>{
        setOpen(false);
    }
    const route = useRoute<RouteProp<ParamList, 'Recommendation'>>()
    
    useEffect(()=>{
        props.loadRecommendation(route.params.packageId);
    },[]);


    useEffect(()=>{
        console.log(props.location);
        if(props.location.name){
            setRec(true);
        }else{
            setRec(false);
        }
    }, [props.isLoading])

    return(
        <>
        { props.isLoading ? <LoadingSpinner message="Trwa ??adowanie rekomendacji..." /> :
        <>
        { isOpen ?  <MessageScreen title="Wymagana zgoda" message="Czy chcesz przenie???? paczk?? na rekomendowan?? lokalizacj???"
            onClose = {onClose} onYes={onYes} loadingMessage="Trwa przenoszenie paczki..." isLoading={props.isTransferLoading}
        /> : 
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Akcje</Text>
            </View>
            <View style={styles.body}>
            { recommendationEnabled && 
            <TouchableOpacity style={styles.recommendedItem} onPress={
                ()=>{
                    setOpen(true);
                }
            }>
                <View style={styles.infoRow}>
                    <Icon name="move" size={48} color="white" style={styles.border}/>
                    <View style={styles.marginLeft}>
                        <Text style={styles.textWhite}>{props.location.shortName} - {props.location.name}</Text>
                        <Text style={styles.textGrey}>Rekomendowana</Text>
                    </View>
                </View>
            </TouchableOpacity>
            }
            <TouchableOpacity style={styles.searchLocation} onPress={
                ()=>{
                    navigation.navigate('Locations');
                }
            }>
            <View style={styles.infoRow}>
                    <Icon name="search" size={48} color="white" style={styles.border}/>
                    <View style={styles.marginLeft}>
                        <Text style={styles.textWhite}>Szukaj lokalizacji</Text>
                        <Text style={styles.textGrey}>Nierekomendowana</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        </View>
        }
        </>
        }
        </>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 10,
    },
    header: {
      flex: 2,
      backgroundColor: "#325aa8",
      justifyContent: 'center',
    },
    headerText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 30
    },
    headerTextSmall:{
        textAlign: 'center',
        color: 'white',
        fontSize: 24
    },
    textWhite : {
        color: 'white',
        fontSize: 16
    },
    textHeader : {
        color: "#545759"
    },
    marginLeft: {
        marginLeft: 20,
    },
    border:{
        padding: 2,
        borderWidth: 1,
        borderColor: 'white'
    },
    body: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        padding:10,
        flex:8
    },
    bodyItem:{
        flex: 1,
    },
    infoRow:{
        flexDirection: 'row'
    },
    recommendedItem:{
        backgroundColor: "#32a852",
        padding: 20,
    },
    textGrey:{
        color: '#cfd4d4',
        fontSize: 16
    },
    searchLocation:{
        marginTop: 30,
        backgroundColor: "#d12d1b",
        padding: 20,
    }

  });
const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        loadRecommendation :(packageId : string) : void => (
            dispatch(getRecommendation(packageId))
        ),
        tranferLocation :(packageId: string,fromLocationId: string,toLocationId: string) : void =>(
            dispatch(tranferRequestCreate(packageId, fromLocationId, toLocationId))
        ),
        loadPackage :(orderId: string, packageId : string) : void => (
            dispatch(fetchPackage(orderId, packageId))
        )
    }
  }
  const mapStateToProps = (store: AppState) => {
    return {
        isTransferLoading: store.package.isTransferLoading,
        location: store.package.recommendedLocation,
        package: store.package.package,
        isLoading : store.package.isLoading,
        needFetch : store.package.needFetch
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatch
  )(SelectPackegeLocationScreen);