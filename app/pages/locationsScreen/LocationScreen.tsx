import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { LocationInfo } from '../../model/LocationInfo';
import { PackageInfo } from '../../model/PackageInfo';
import { AppState } from '../../redux';
import { getLocations } from '../../redux/actions/thunkActions/Locations-ThunkActions';
import { tranferRequestCreate } from '../../redux/actions/thunkActions/Package-ThunkActions';
import MessageScreen from '../messageScreen/MessageScreen';

interface Props{
    isLoading : boolean;
    locations: LocationInfo[];
    loadLocations() : void;
    isTransferLoading : boolean;
    tranferLocation(packageId: string,fromLocationId: string,toLocationId: string) : void;
    package: PackageInfo;
    needFetch : boolean;
}

const LocationsScreen = (props : Props) =>{
    
    const [isOpen, setOpen] = React.useState(false);
    const navigation = useNavigation();
    const [location, setLocation] = React.useState<LocationInfo>();
    const onYes = ()=>{
        props.tranferLocation(props.package.packageId, props.package.locationId,
            location!.id);
    };
    useEffect(()=>{
        console.log(props.needFetch);
        if(props.needFetch){
            onClose();
            navigation.goBack();
        }
    })

    const selectLocation = (info : LocationInfo) =>{
        console.log(info);
        setLocation(info);
    }
    const onOpen = () =>{
        setOpen(true);
    }
    const onClose = ()=>{
        setOpen(false);
    }
    useEffect(()=>{
        props.loadLocations();
    },[]);
    
    return (
        <>
        { props.isLoading ? <LoadingSpinner message="Trwa ładowanie lokalizacji..." /> :
         <>
         { isOpen ?  <MessageScreen title="Wymagana zgoda" message="Czy chcesz przenieść paczkę na rekomendowaną lokalizację?"
             onClose = {onClose} onYes={onYes} loadingMessage="Trwa przenoszenie paczki..." isLoading={props.isTransferLoading}
         /> : 
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Lokalizacje</Text>
                </View>
                <View style={styles.body}>
                <FlatList
                    data={props.locations}
                    renderItem={item => (
                        <Item loctionView={item.item}
                        selectLocation = {selectLocation}
                        onPress = {onOpen}/>
                    )}
                    keyExtractor={item => item.id}
                />
                </View>
             </View>
            }
             </>
        }
        </>
                    
    )
}
interface ItemProps{
    loctionView: LocationInfo
    selectLocation(info : LocationInfo)  : void;
    onPress() : void
}
const Item = (props : ItemProps) =>{

    return(
    <TouchableOpacity style={styles.searchLocation} onPress={
        ()=>{
            props.selectLocation(props.loctionView);
            props.onPress();
        }
    }>
    <View style={styles.infoRow}>
            <Icon name="location" size={48} color="white" style={styles.border}/>
            <View style={styles.marginLeft}>
                <Text style={styles.textWhite}> {props.loctionView.name} </Text>
                <Text style={styles.textGrey}> {props.loctionView.shortName}</Text>
            </View>
        </View>
    </TouchableOpacity>
    );
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
        marginTop: 10,
        backgroundColor: "#d12d1b",
        padding: 20,
    }

  });

const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        loadLocations:() : void => (
            dispatch(getLocations())
        ),
        tranferLocation :(packageId: string,fromLocationId: string,toLocationId: string) : void =>(
            dispatch(tranferRequestCreate(packageId, fromLocationId, toLocationId))
        ),
    }
  }
  const mapStateToProps = (store: AppState) => {
    return {
        locations: store.locations.locations,
        isLoading : store.locations.isLoading,
        isTransferLoading : store.package.isTransferLoading,
        package : store.package.package,
        needFetch: store.package.needFetch
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatch
  )(LocationsScreen);