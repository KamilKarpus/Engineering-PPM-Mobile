import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Props{
    items: any;
    renderItem(item: any) : any;
    keyExtractor(item: any): any;

}

const List = (props : Props) =>{
    return(
        <View>
            <FlatList 
                data={props.items}
                renderItem={props.renderItem}
                keyExtractor={props.keyExtractor}
            />

        </View>
    )
};

export default List;