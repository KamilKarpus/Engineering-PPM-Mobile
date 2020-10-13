import React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, View } from 'react-native';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

const PPMInput = ({customholder, onFocus, onBlur, ...props} : any) =>{
    const [isFocused, setFocused] = React.useState(false);
    const handleFocus = (e : NativeSyntheticEvent<TextInputFocusEventData>)=>{
        setFocused(true);
        if(onFocus){
            onFocus(e);
        }
    }
    const handleBlur = (e : NativeSyntheticEvent<TextInputFocusEventData>)=>{
        setFocused(false);
        if(onBlur){
            onBlur(e);
        }
    }
    return(
        <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={
          isFocused ? BLUE : LIGHT_GRAY
        }
        placeholder={customholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.textInput}
        {...props} />
    )
}
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 6
  }
});

export default PPMInput;