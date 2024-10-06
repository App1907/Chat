import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { vh, vw } from '../utils/dimensions';
import { Icons } from '../assets';

const SearchBar = () => {
    return (
        <View style={styles.searchBarContainer}>
            <Image source={Icons.graySearch} style={{width:vw(15), height:vh(15), resizeMode:'contain', marginLeft:vw(18.5), marginRight:vw(18.5), tintColor:'#85929C'}}/>
            <TextInput style={styles.searchBar} 
            placeholder="Search messages..." 
            placeholderTextColor="#ABB3BA"/>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        height: vh(48),
        width: vw(361),
        borderRadius: 8,
        borderColor: 'white',
        backgroundColor: 'white', //#F8F9F9
        marginTop: vh(20),
        marginLeft: 15,
        fontWeight: '500',
        alignItems:'center',

    },
    searchBar: {
        fontSize: vh(15),

    },
});