import { View, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DataMaterials from '../Database/dataMaterials';

const NewBudget = () => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([])
    const navigation = useNavigation();
    const [textDelete, setText] = useState();
    
    useEffect(() => {
        fetchData("https://randomuser.me/api/?results=100");
    }, []);
    const fetchData = async(url) => {
        try{
         const response = await fetch(url);
         const json = await response.json();
         setData(json.results);
         setFilterData(json.results);
         console.log("hola");
        }
        catch(error){
            console.error(error);
            console.log("hola")
        }
    };  
    const deleteText = () => {
        setText("");
    }
    const searchFilterFunction = (text) => {
        setText(text)
        if(text) {
            const newData = data.filter(item => {
                const itemData = item.name.first ? item.name.first.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData)
        } else{
            setFilterData(data);
        }         
    };
    return (
        <LinearGradient colors={['#304BB8', '#2C91A8',]} style={style.linearGradient}>
            <SafeAreaView style={[style.container]}>
                <SafeAreaView style={style.searchbar}>
                    <TextInput onChange={(event) => {searchFilterFunction(event.nativeEvent.text)}} style={{ marginTop: 9, fontSize: 18 }} placeholder='Buscar'
                        value={textDelete}/>
                    <TouchableOpacity
                        style={style.closeButtonParent}
                        onPress={deleteText}
                    >
                        <Image
                            style={style.closeButton}
                            source={require("../Images/close-button.png")}
                        />
                        
                    </TouchableOpacity>
                </SafeAreaView >
                <SafeAreaView >
                <ScrollView style={{maxHeight:150}} showsVerticalScrollIndicator={false}>
                    {
                        filterData.map((item, index) => {
                            return (
                                <View key={index} style={[style.ViewData]}>
                                    <Image source={{uri: item.picture.large}}
                                    style={[style.ImageProfile]} />
                                    <View>
                                        <Text style={[style.TextData]}>{item.name.first}{item.name.last}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
        </LinearGradient>

    )
}

export default NewBudget

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    searchbar: {
        width: 380,
        height: 48,
        borderRadius: 30,
        backgroundColor: "#969FCF",
        marginTop: 50,
        paddingLeft: 10,
        marginLeft: 10
    },
    closeButton: {
        height: 30,
        width: 30,
    },
    closeButtonParent: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: 5,
        marginBottom: 46
    },
    linearGradient: {
        flex: 1,
    },
    ViewData: {
        maxHeight:100,
        width:350,
        flexDirection:"row",
        alignItems:"center",
        marginTop:20,
    },
    TextData:{
        fontSize:20,
        fontWeight:"bold",
        marginLeft:20

    },
    ImageProfile:{
        width:50,
        height:50,
        borderRadius:25,
    },
})