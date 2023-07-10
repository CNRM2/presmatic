import { View, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native'
import { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import dataMaterials from '../Database/dataMaterials.json';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import * as SQLITE from 'expo-sqlite';

const NewBudget = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([])
  const navigation = useNavigation();
  const [textDelete, setText] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("#7E8BEC")
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [total, setTotal] = useState(0);
  const [db, setDb] = useState(SQLITE.openDatabase('materials.db'));

  useFocusEffect(
    React.useCallback(() => {
      fetchLocalData();
      calculateTotal(selectedItems);

      return () => {
        // Opcionalmente, puedes limpiar o realizar alguna acción cuando la pantalla pierda el enfoque
      };
    }, [selectedItems])
  );

  const fetchLocalData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM materiales',
        [],
        (tx, result) => {
          const items = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            items.push({
              idMateriales: row.idMateriales,
              nombreMaterial: row.nombreMaterial,
              precio: row.precio
            });
          }
          setFilterData(items);
        },
        (error) => {
          console.log('Error al obtener los datos de la base de datos:', error);
        }
      );
    });
  };

  const deleteText = () => {
    setText("");
    fetchLocalData();
  };

  const searchFilterFunction2 = (text) => {
    setText(text);
    if (text) {
      const newData = filterData.filter(item => {
        const itemData = item.nombreMaterial ? item.nombreMaterial.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  };

  const addToSelectedItems = (item) => {
    const isDuplicate = selectedItems.some((selectedItem) => selectedItem.idMateriales === item.idMateriales);
    if (!isDuplicate) {
      setSelectedItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, quantity: item.quantity + 1 };
          calculateTotal(prevItems, updatedItem);
          return updatedItem;
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index && item.quantity > 1) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          calculateTotal(prevItems, updatedItem);
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeItem = (index) => {
    setSelectedItems((prevItems) => {
      const removedItem = prevItems[index];
      const updatedItems = prevItems.filter((_, i) => i !== index);
      calculateTotal(updatedItems);
      return updatedItems;
    });
  };

  const calculateTotal = (items) => {
    const updatedTotal = items.reduce((accumulator, item) => accumulator + item.quantity * item.precio, 0);
    const formattedTotal = updatedTotal.toFixed(2); // Formatear el total a dos decimales
    setTotal(formattedTotal);
  };

  return (
    <LinearGradient colors={['#304BB8', '#2C91A8',]} style={style.linearGradient}>
      <SafeAreaView style={[style.container]}>
        <SafeAreaView style={style.searchbar}>
          <TextInput onChangeText={searchFilterFunction2} style={{ marginTop: 9, fontSize: 18 }} placeholder='Buscar'
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
                    <View>
                      <TouchableOpacity onPress={() => addToSelectedItems(item)}>
                        <Text style={[style.TextData]}>{"$"}{item.precio}{"   "}{item.nombreMaterial}</Text>
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
                        <Text style={[style.TextData, { fontSize: 13 }]} numberOfLines={1}>
                          {`${item.precio}${item.nombreMaterial}`.length > 20
                            ? `${"$"}${item.precio}${" "}${item.nombreMaterial}`.substring(0, 20) + '...'
                            : `${"$"}${item.precio}${" "}${item.nombreMaterial}`}
                        </Text>
                      </SafeAreaView>
                    </View>

                    <View style={[style.buttonsBoxListView]}>
                      <TouchableOpacity onPress={() => increaseQuantity(index)}>
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
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>
              Total: ${total}
            </Text>
          </View>
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