import { View, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native'
import { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DataMaterials from '../Database/dataMaterials';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

const NewBudget = () => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([])
    const navigation = useNavigation();
    const [textDelete, setText] = useState();
    const [selectedItems, setSelectedItems] = useState([]);


    useEffect(() => {
        fetchData("https://randomuser.me/api/?results=100");
    }, []);
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);
            setFilterData(json.results);
            console.log("hola");
        }
        catch (error) {
            console.error(error);
            console.log("hola")
        }
    };
    const deleteText = () => {
        setText("");
    }
    const searchFilterFunction = (text) => {
        setText(text)
        if (text) {
            const newData = data.filter(item => {
                const itemData = item.name.first ? item.name.first.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData)
        } else {
            setFilterData(data);
        }
    };
    const addToSelectedItems = (item) => {
        const isDuplicate = selectedItems.some((selectedItem) => selectedItem.name === item.name);
        if (!isDuplicate) {
            setSelectedItems((prevItems) => [...prevItems, item])};
    };
    return (
        <LinearGradient colors={['#304BB8', '#2C91A8',]} style={style.linearGradient}>
            <SafeAreaView style={[style.container]}>
                <SafeAreaView style={style.searchbar}>
                    <TextInput onChange={(event) => { searchFilterFunction(event.nativeEvent.text) }} style={{ marginTop: 9, fontSize: 18 }} placeholder='Buscar'
                        value={textDelete} />
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
                    <TouchableOpacity>

                    </TouchableOpacity>
                    <ScrollView style={{ maxHeight: 150 }} showsVerticalScrollIndicator={false}>
                        {
                            filterData.map((item, index) => {
                                return (
                                    <View key={index} style={[style.ViewData]}>
                                        <Image source={{ uri: item.picture.large }}
                                            style={[style.ImageProfile]} />
                                        <View>
                                            <TouchableOpacity onPress={() => addToSelectedItems(item)}>
                                                <Text style={[style.TextData]}>{item.name.first}{item.name.last}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={[style.Lisview]}>
                    <Text>Lista Nueva:</Text>
                    <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                        {
                            selectedItems.map((item, index) => {
                                return (
                                    <View key={index} style={[style.ViewData, { backgroundColor: "#F0EEF0", marginTop: 2, borderRadius: 15, width: 325 }]}>
                                        <Image source={{ uri: item.picture.large }}
                                            style={[style.ImageProfile, { height: 40, width: 40,marginBottom:2,marginTop:2 }]} />
                                        <View>
                                            <TouchableOpacity>
                                                <Text style={[style.TextData, { fontSize: 16 }]}>{item.name.first}{item.name.last}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                                            <TouchableOpacity style={{}}>
                                                <AntDesign name="pluscircleo" size={30} color="black"></AntDesign>
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 5, marginRight: 5,fontSize:16,fontWeight:"600" }}>1</Text>
                                            <TouchableOpacity style={{ marginRight: 10 }}>
                                                <AntDesign name="minuscircleo" size={30} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
            <TouchableOpacity style={{marginHorizontal:100, marginBottom:20,alignItems:"center",backgroundColor:"black",
             padding:15,borderRadius:15}}>
                <Text style={{color:"white",fontSize:20}}>Crear Archivo</Text>
            </TouchableOpacity>
        </LinearGradient>

    )
}

export default NewBudget;

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
        maxHeight: 100,
        width: 350,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    TextData: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20

    },
    ImageProfile: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10
    },
    Lisview: {
        flex: 1,
        marginTop: 40,
        alignItems: "center",
        backgroundColor: "#FFFDFF",
        borderRadius: 15,
        marginBottom: 50,
        width: 350,
    }
})