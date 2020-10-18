import React, { useEffect, useState } from "react";
import {
    StyleSheet, TouchableOpacity, Text, View
  } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";


const ScannerScreen = () =>{
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === 'granted');
    })();
  }, []);

  
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <BarCodeScanner
          onBarCodeScanned={e => {
          let data = JSON.parse(e.data);
          if(data.PackageId){
            console.log(data);
            navigation.navigate('Info', {
              PackageId: data.PackageId,
              OrderId: data.OrderId
            });
          }

          }}
          style = {StyleSheet.absoluteFillObject}
        />
      </View>
    );
}
 
export default ScannerScreen;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});