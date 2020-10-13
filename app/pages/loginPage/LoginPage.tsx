import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {PPMInput, PPMButton} from '../../components/common/';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getCredientials } from '../../redux/actions/thunkActions/Auth-ThunkActions';
import { AppState } from '../../redux/ReduxConfiguration';
import { useNavigation } from '@react-navigation/native';

interface StateProps{
    isLoading : boolean;
    userEmail: string;
    hasError: boolean;
} 
interface PropsToDispatch{
    getUserCredential(email: string, password: string) : void
}

type Props =  StateProps & PropsToDispatch;

const LoginPage = (props : Props) =>{
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation();
    const loginChange= (text: string)=>{
        setLogin(text);
    }
    const passwordChange = (text: string) =>{

        setPassword(text);
    }
    useEffect(()=>{
        if(props.userEmail){
            console.log("have email");
            navigation.navigate('Home');
            }
        });


         return(
        <View style = { styles.container}>
            {props.isLoading ? ( <LoadingSpinner message={"Trwa logowanie..."}/> ) :
            (
            <>  
            <PPMInput customholder="Email" onChangeText={loginChange}/>
            <PPMInput customholder="Hasło" textContentType="password" secureTextEntry={true}
                onChangeText={passwordChange}/>
            <PPMButton title="Zaloguj" backgroundColor="#007bff" onPress={() => props.getUserCredential(login, password)}/> 
            </>
            )}
        </View>
    );
}

const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        getUserCredential:(email: string, password: string) : void => (
            dispatch(getCredientials(email, password))
        )
    }
  }
  const mapStateToProps = (store: AppState) => {
    return {
        isLoading: store.auth.isLoading,
        userEmail: store.auth.userEmail,
        hasError: store.auth.hasError
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatch
  )(LoginPage);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });
  