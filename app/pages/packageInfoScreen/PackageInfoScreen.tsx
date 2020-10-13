import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { PackageInfo } from '../../model/PackageInfo';
import { AppState } from '../../redux';
import { fetchPackage } from '../../redux/actions/thunkActions/Package-ThunkActions';
import * as Progress from 'react-native-progress';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingSpinner from '../../components/common/LoadingSpinner';

type ParamList = {
    Info: {
        OrderId: string;
        PackageId: string;
    }
}

interface StateProps{
    isLoading: boolean;
    package: PackageInfo;
}

interface DispatchProps{
    loadPackage(orderId: string, packageId : string) : void;
}

type Props = StateProps & DispatchProps;

const PackageInfoScreen = (props: Props) =>{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const navigation = useNavigation();


    const route = useRoute<RouteProp<ParamList, 'Info'>>();
    useEffect(()=>{
        props.loadPackage(route.params.OrderId, route.params.PackageId);

    }, [])

    return(
    <>
        {props.isLoading ? <LoadingSpinner message="Trwa ładowanie paczki.."/> :
        <>
        <View style={styles.container}>
        <View style={styles.header} >
            <Text style={styles.headerText}>{props.package.orderYear}/{props.package.orderNumber}</Text>
            <Text style={styles.headerTextSmall}>Numer paczki {props.package.number}</Text>
        </View>
        <View style={styles.body}>
            <View style={styles.bodyItem}>
                <Text style={styles.textHeader}>Postęp:</Text>
                <Progress.Bar progress={props.package.progress} width={350} height={20} />
            </View>
        <View style={styles.bodyItem}>
            <Text style={styles.textHeader}>Lokalizacja:</Text>
            <Text>{props.package.locatioName}</Text>
        </View>
        <View style={styles.bodyItem}>
            <Text style={styles.textHeader}>Zamówienie dla firmy: </Text>
            <Text>
                {props.package.companyName}
            </Text>
        </View>
        <View style={styles.bodyItem}>
        <Text style={styles.textHeader}>Proces produkcyjny: </Text>
            <Text>
                {props.package.flowName}
            </Text>
        </View>
        <View style={styles.bodyItem}>
                <View style={styles.infoRow}>
                    <View style={styles.bodyItem}>
                    <Text style={styles.textHeader}>Wysokość: </Text>
                        <Text>
                            {props.package.height} m
                        </Text>
                    </View>
                    <View style={styles.bodyItem}>
                    <Text style={styles.textHeader}>Długość: </Text>
                        <Text>
                            {props.package.length} m
                        </Text>
                    </View>
                    <View style={styles.bodyItem}>
                    <Text style={styles.textHeader}>Szerokość: </Text>
                        <Text>
                            {props.package.width} m
                        </Text>
                    </View>
                    <View style={styles.bodyItem}>
                    <Text style={styles.textHeader}>Waga: </Text>
                        <Text>
                            {props.package.weight} kg
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bodyItem}>
                    <Text style={styles.textHeader}>Data ukończenia: </Text>
                    <Text>
                         {new Date(props.package.deliveryDate).toLocaleDateString('pl-PL',options)}
                    </Text>
                </View>
        </View>
    </View>
    <ActionButton
    renderIcon={()=><Icon name="package-up" size={30} color="white"/>}
    onPress={() => {navigation.navigate('Recommendation', {
        packageId : props.package.packageId
    })}
    } />   
    </>
    }
    </>

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
    textHeader : {
        color: "#545759"
    },
    body: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        padding:10,
        backgroundColor: "#35adf2",
        flex:8
    },
    bodyItem:{
        flex: 1,
    },
    infoRow:{
        flex: 3,
        flexDirection: 'row'
    }

  });


const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        loadPackage :(orderId: string, packageId : string) : void => (
            dispatch(fetchPackage(orderId, packageId))
        )
    }
  }
  const mapStateToProps = (store: AppState) => {
    return {
        isLoading: store.package.isLoading,
        package: store.package.package
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatch
  )(PackageInfoScreen);
  