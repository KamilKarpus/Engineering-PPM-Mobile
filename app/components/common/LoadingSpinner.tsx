import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
interface Props{
    message : string;
}

const LoadingSpinner = (props : Props) =>{
    return(
        <View>
            <ActivityIndicator size={180} />
            <Text style={styles.textStyle}>{props.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontSize: 20
    }
    
});

export default LoadingSpinner;