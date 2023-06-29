import { View, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native'
import { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DataMaterials from '../Database/dataMaterials';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

const NewBudget = () => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([])
    const navigation = useNavigation();
    const [textDelete, setText] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("#7E8BEC")
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

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
            setSelectedItems((prevItems) => [...prevItems, { ...item, quantity: 1 }])

        };
    };
    const increaseQuantity = (index) => {
        setSelectedItems((prevItems) =>
            prevItems.map((item, i) => {
                if (i === index) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };

    const decreaseQuantity = (index) => {
        setSelectedItems((prevItems) =>
            prevItems.map((item, i) => {
                if (i === index && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    };

    const removeItem = (index) => {
        setSelectedItems((prevItems) =>
            prevItems.filter((_, i) => i !== index)
        );
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
                                const isSelected = selectedItemIndex === index;
                                return (
                                    <TouchableOpacity key={index} onPress={() => setSelectedItemIndex(index)} style={[style.ViewData, { backgroundColor: isSelected ? '#6FA4FA' : "#F0EEF0", marginTop: 2, borderRadius: 15, width: 325 }]}>
                                        <View>
                                            <SafeAreaView style={{ height: 50, justifyContent: "center" }}>
                                                <Text style={[style.TextData, { fontSize: 16 }]} numberOfLines={1}>
                                                    {`${item.name.first}${item.name.last}`.length > 10
                                                        ? `${item.name.first}${item.name.last}`.substring(0, 15) + '...'
                                                        : `${item.name.first}${item.name.last}`}
                                                </Text>
                                            </SafeAreaView>
                                        </View>

                                        <View style={[style.buttonsBoxListView]}>
                                            <TouchableOpacity onPress={() => increaseQuantity(index)} style={{}}>
                                                <AntDesign name="pluscircleo" size={30} color="black"></AntDesign>
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 16, fontWeight: "600" }}>
                                                {item.quantity}
                                            </Text>
                                            <TouchableOpacity onPress={() => decreaseQuantity(index)} style={{ marginRight: 20 }}>
                                                <AntDesign name="minuscircleo" size={30} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => removeItem(index)} style={{ marginRight: 20 }} >
                                                <FontAwesome name="trash-o" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
            <TouchableOpacity style={{
                marginHorizontal: 100, marginBottom: 20, alignItems: "center", backgroundColor: "black",
                padding: 15, borderRadius: 15
            }}>
                <Text style={{ color: "white", fontSize: 20 }}>Crear Archivo</Text>
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
    },
    buttonsBoxListView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    }
})