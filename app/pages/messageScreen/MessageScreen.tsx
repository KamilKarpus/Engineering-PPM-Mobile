import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PPMButton, PPMInput } from '../../components/common';

interface Props{
    title: string;
    message: string;
    onClose() : void;
    onYes() : void;
};

const MessageScreen = (props : Props) =>{
    return(
        <View  style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.infoText}>
                    {props.message}
                </Text>
                <View style={styles.buttonContainer}>
                    <PPMButton title="Tak" backgroundColor="#325aa8" onPress={()=>{
                        props.onYes();
                    }}/>
                </View>
                <View style={styles.buttonContainer}>
                    <PPMButton title="Nie" backgroundColor="red" onPress={()=>{
                        props.onClose();
                    }}/>
                </View>
            </View>
        </View>
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
    infoText:{
        textAlign: 'center',
        fontSize: 30
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
        flex:8
    },
    bodyItem:{
        flex: 1,
    },
    infoRow:{
        flex: 3,
        flexDirection: 'row'
    },
    buttonContainer: {
        marginTop: 20,
    }

  });
export default MessageScreen;