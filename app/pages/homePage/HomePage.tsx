import React, { useEffect } from "react"
import { View, Text, StyleSheet} from "react-native"
import { connect } from "react-redux";
import { AppState } from "../../redux";
import ActionButton from 'react-native-action-button';
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PackageInfo } from "../../model/PackageInfo";
import { PackageCacheItem } from "../../shared/model/PackageCacheItem";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { loadCache } from "../../redux/actions/thunkActions/Package-ThunkActions";

interface StateProps{
    userEmail: string;
    packages : PackageCacheItem[];
    loadPackages() : void;
}
type Props = StateProps;
const HomePage = (props: Props) =>{
    const navigation = useNavigation();

    const navigate = (packageId: string, orderId: string) =>{
        navigation.navigate('Info', {
            PackageId: packageId,
            OrderId: orderId
          });
    }

    useEffect(()=>{
        props.loadPackages();
    },[])

    return(
        <>
        <View style={styles.container}>
            <View style={styles.header} >
                <Text style={styles.headerText}>Operator</Text>
            </View>
            <View style={styles.body}>
            <FlatList
                    data={props.packages}
                    renderItem={item => (
                        <Item packageView={item.item} navigate={navigate}/>
                    )}
                    keyExtractor={item => item.packageId}
            />
            </View>
        </View>
        <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => {  navigation.navigate('Scan')}}
        renderIcon = {()=> <Icon name="qrcode-scan" size={30} color="white" />}
        />
        </>
    )
}
interface ItemProps{
    packageView: PackageCacheItem,
    navigate(packageId: string, orderId: string) : void;
}

const Item = (props: ItemProps) => (
    <TouchableOpacity style={styles.menuItem} onPress={()=>{
        props.navigate(props.packageView.packageId, props.packageView.orderId);
    }}>
      <Text style={styles.textMenu}>Zamówienie: {props.packageView.orderNumber}/{props.packageView.orderYear}</Text>
      <Text style={styles.textMenu}>Numer paczki: {props.packageView.number}</Text>
      <Text style={styles.textMenu}>Klient: {props.packageView.companyName}</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
    container: {
        flex: 10
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
    body: {
        flex:8
    },
    menuItem: {
        backgroundColor: "#3285e3",
        marginTop:5,
        padding:10    
    },
    textMenu:{
        color: "white",
        fontSize: 16
    }

  });

const mapStateToProps = (store: AppState) => {
    return {
        userEmail: store.auth.userEmail,
        packages: store.cache.packages
    };
  };

  const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        loadPackages :() : void => (
            dispatch(loadCache())
        ),
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatch
  )(HomePage);
