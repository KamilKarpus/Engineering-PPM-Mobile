import React from "react"
import { View, Text, StyleSheet} from "react-native"
import { connect } from "react-redux";
import { AppState } from "../../redux";
import ActionButton from 'react-native-action-button';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StateProps{
    userEmail: string;
}
type Props = StateProps;
const HomePage = (props: Props) =>{
    const navigation = useNavigation();
    return(
        <>
        <View style={styles.container}>
            <View style={styles.header} >
                <Text style={styles.headerText}>Operator</Text>
            </View>
            <View style={styles.body}>

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

  });

const mapStateToProps = (store: AppState) => {
    return {
        userEmail: store.auth.userEmail
    };
  };
  export default connect(
    mapStateToProps
  )(HomePage);
