import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacityBase, TouchableOpacity, Image, TextInput, PermissionsAndroid, Alert } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-ionicons'
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react'
import { Modal } from 'react-native'
import dataMaterials from '../Database/dataMaterials.json'
import * as SQLITE from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native'

const ConfigPage = () => {
  const [idMaterial, setIdMaterial] = useState('');
  const [nombreMaterial, setNombreMaterial] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [db, setDb] = useState(SQLITE.openDatabase('materials.db'));
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [textDelete, setText] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIdMaterial, setSelectedIdMaterial] = useState('');
  const [selectedNombreMaterial, setSelectedNombreMaterial] = useState('');
  const [selectedPrecio, setSelectedPrecio] = useState('');
  const [selectedDescripcion, setSelectedDescripcion] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      fetchLocalData();

      return () => {
        // Opcionalmente, puedes limpiar o realizar alguna acción cuando la pantalla pierda el enfoque
      };
    }, [])
  );

  const handleSearchChange = (text) => {
    setText(text);
    if (text) {
      const newData = filterData.filter((item) => {
        const itemData = item.nombreMaterial ? item.nombreMaterial.toUpperCase() : ''.toUpperCase();
        const itemIdData = item.idMateriales ? item.idMateriales.toString().toUpperCase() : '';
        const textData = text.toUpperCase();
        return itemData.includes(textData) || itemIdData.includes(textData);
      });
      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  };

  const deleteText = () => {
    setText("");
    fetchLocalData();
  };

  useEffect(() => {
    fetchLocalData();
  }, []);

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
              precio: row.precio,
              descripcion: row.descripcion
            });
          }
          setData(items);
          setFilterData(items);
        },
        (error) => {
          console.log('Error al obtener los datos de la base de datos:', error);
        }
      );
    });
  };



  const addToSelectedItems = (item) => {
    setSelectedItems([item]); // Reemplazar el material seleccionado existente con el nuevo material seleccionado
    setSelectedIdMaterial(item.idMateriales);
    setSelectedNombreMaterial(item.nombreMaterial);
    setSelectedPrecio(item.precio);
    setSelectedDescripcion(item.descripcion);
  };


  const addItemtoDelete = (item) => {
    setSelectedItems([item]);
  };



  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS materiales (idM INTEGER PRIMARY KEY AUTOINCREMENT, idMateriales VARCHAR(50) NOT NULL, nombreMaterial VARCHAR(50) NOT NULL, precio VARCHAR(20) NOT NULL, descripcion VARCHAR(50) NOT NULL)');
    }, (error) => {
      console.log('Error al crear la tabla:', error);
    }, () => {
      console.log('Tabla creada correctamente');
    });
  }, []);

  const onPressHandler = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO materiales (idMateriales, nombreMaterial, precio, descripcion) values (?, ?, ?, ?)',
        [idMaterial, nombreMaterial, precio, descripcion],
        (tx, result) => {
          console.log('Registro insertado correctamente');
          console.log('idMaterial:', idMaterial);
          console.log('nombreMaterial:', nombreMaterial);
          console.log('precio:', precio);
          console.log('descripcion:', descripcion);
          Alert.alert('Éxito', 'El material se ha registrado correctamente', [
            { text: 'Ok' }
          ]);
        },
        (error) => {
          console.log('Error al insertar el registro:', error);
        }
      );

    },
      (error) => {
        console.log('Error al consultar la base de datos:', error);
      }
    )
  };

  const updateMaterial = () => {
    if (selectedIdMaterial) {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE materiales SET nombreMaterial = ?, precio = ?, descripcion = ? WHERE idMateriales = ?',
          [selectedNombreMaterial, selectedPrecio, selectedDescripcion, selectedIdMaterial],
          (_, result) => {
            if (result.rowsAffected > 0) {
              console.log('Material actualizado correctamente');
              Alert.alert("Actualizado", "Material actualizado correctamente", [{ text: "Ok" }]);
              fetchLocalData();
              // Realizar acciones adicionales después de la actualización
            } else {
              console.log('No se encontró el material con el ID especificado');
            }
          },
          (_, error) => {
            console.log('Error al actualizar el material:', error);
          }
        );
      });
    }
  };

  const deleteMaterial = (idMaterial) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM materiales WHERE idMateriales = ?',
        [idMaterial],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Material eliminado correctamente');
            setSelectedItems([]); // Reiniciar el estado selectedItem
            Alert.alert("Eliminado", "Material eliminado correctamente", [{ text: "Ok" }]);
            fetchLocalData();
            // Realizar acciones adicionales después de la eliminación
          } else {
            console.log('No se pudo eliminar el material');
          }
        },
        (_, error) => {
          console.log('Error al eliminar el material:', error);
        }
      );
    });
  };

  const handleDelete = () => {
    if (selectedItems.length > 0) {
      const idMaterial = selectedItems[0].idMateriales;
      deleteMaterial(idMaterial);
    }
  };

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const toggleModal1 = () => {
    setModalVisible1(!modalVisible1);
    fetchLocalData();
  };

  const toggleModal3 = () => {
    setModalVisible3(!modalVisible3);
    fetchLocalData();
    if (!modalVisible3) {
      resetSelectedItems();
    }
  };

  const resetSelectedItems = () => {
    setSelectedItems([]);
    setSelectedIdMaterial('');
    setSelectedNombreMaterial('');
    setSelectedPrecio('');
    setSelectedDescripcion('');
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
    fetchLocalData();
    if (!modalVisible3) {
      resetSelectedItems();
    }
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDFF" }}>
      <Text style={[style.title, { marginLeft: 30, marginTop: 50 }]}>Configuraciones</Text>
      <ScrollView style={[style.container]}>
        <Text style={[style.subtitle, { marginTop: 1, marginLeft: 40 }]}>Inicio de Sesion</Text>
        <TouchableOpacity style={[style.configoptions]}>
          <Fontisto style={{ marginRight: 10 }} name='person' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Datos Personales</Text>
        </TouchableOpacity>
        <Text style={[style.subtitle, { marginTop: 10, marginLeft: 40 }]}>Materiales y Presupuestos</Text>
        <TouchableOpacity onPress={toggleModal1} style={[style.configoptions]}>
          <Ionicons style={{ marginRight: 10 }} name='add' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Agregar Material</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal2} style={[style.configoptions]}>
          <Entypo style={{ marginRight: 10 }} name='edit' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Actualizar Material</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal3} style={[style.configoptions]}>
          <AntDesign style={{ marginRight: 10 }} name='delete' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Eliminar Material</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <MaterialCommunityIcons style={{ marginRight: 10 }} name='file-import-outline' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Importar Lista de Materiales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <MaterialIcons style={{ marginRight: 10 }} name='drive-file-move-outline' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Ruta de Guardado</Text>
        </TouchableOpacity>
        <Text style={[style.subtitle, { marginTop: 10, marginLeft: 40 }]} >Ayuda</Text>
        <TouchableOpacity style={[style.configoptions]}>
          <MaterialIcons style={{ marginRight: 10 }} name='bug-report' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Reportar Bugs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <Ionicons style={{ marginRight: 10 }} name='md-mail' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Contactanos</Text>
        </TouchableOpacity>
        <Text style={[style.subtitle, { marginTop: 10, marginLeft: 40 }]} >App</Text>
        <TouchableOpacity style={[style.configoptions]}>
          <Fontisto style={{ marginRight: 10 }} name='persons' size={24} color={"black"} />
          <Text style={[style.textconfigOp]}>Acerca de Nosotros</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[style.SignOutBtn]}>
          <Text style={[style.subtitle, { color: "#E5E5EA" }]}>Cerrar Sesion</Text>
        </TouchableOpacity>
        {/* Modal Agregar Materiales */}
        <Modal visible={modalVisible1} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent" }}>
            <View style={{ backgroundColor: '#FFFDFF', padding: 40, borderRadius: 10, borderColor: "gray", borderWidth: 1 }}>
              <Text style={{ fontSize: 23, marginBottom: 10, fontWeight: "700", textAlign: "center" }}>Agregar Nuevo Material</Text>
              <TextInput
                onChangeText={(value) => setIdMaterial(value)}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="ID"
              />
              <TextInput
                onChangeText={(value) => setNombreMaterial(value)}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="Nombre del material"
              />
              <TextInput
                onChangeText={(value) => setPrecio(value)}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="Precio"
              />
              <TextInput
                onChangeText={(value) => setDescripcion(value)}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="Descripcion"
              />
              <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <TouchableOpacity onPress={onPressHandler} style={{ marginTop: 20, marginRight: 20, backgroundColor: 'blue', height: 40, width: 100, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'red', height: 40, width: 100, borderRadius: 5, alignItems: "center", justifyContent: "center" }} onPress={toggleModal1}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Modal Actualizar Materiales */}
        <Modal visible={modalVisible2} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent" }}>
            <View style={{ backgroundColor: '#FFFDFF', padding: 40, borderRadius: 10, borderColor: "gray", borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 23, fontWeight: "700", textAlign: "center" }}>Agregar Nuevo Material</Text>
              <SafeAreaView style={style.searchbar}>
                <TextInput onChangeText={handleSearchChange} style={{ marginTop: 10, fontSize: 18 }} placeholder='Buscar'
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
              <SafeAreaView style={{justifyContent:"center",alignItems:"center"}} >
                <ScrollView style={{ maxHeight: 100}} showsVerticalScrollIndicator={false}>
                  {
                    filterData.map((item, index) => {
                      return (
                        <View key={index} style={[style.ViewData]}>
                          <View>
                            <TouchableOpacity style={{ backgroundColor: "#F0EEF0", borderColor: "black", borderWidth: 1, borderRadius: 15, marginBottom: 2,width:280}} onPress={() => addToSelectedItems(item)}>
                              <Text style={[style.TextData]}>{"$"}{item.precio}{"   "}{item.nombreMaterial}</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </SafeAreaView>
              <TextInput
                onChangeText={(value) => setSelectedIdMaterial(value)}
                value={selectedIdMaterial}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 30, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="ID"
              />
              <TextInput
                onChangeText={(value) => setSelectedNombreMaterial(value)}
                value={selectedNombreMaterial}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="Nombre del material"
              />
              <TextInput
                onChangeText={(value) => setSelectedPrecio(value)}
                value={selectedPrecio}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="Precio"
              />
              <TextInput
                onChangeText={(value) => setSelectedDescripcion(value)}
                value={selectedDescripcion}
                style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 5, width: 250, borderRadius: 10, backgroundColor: "#F0EEF0" }}
                placeholder="Descripcion"
              />
              <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <TouchableOpacity onPress={updateMaterial} style={{ marginTop: 20, marginRight: 20, backgroundColor: 'blue', height: 40, width: 100, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'red', height: 40, width: 100, borderRadius: 5, alignItems: "center", justifyContent: "center" }} onPress={toggleModal2}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Modal Eliminar Materiales */}
        <Modal visible={modalVisible3} animationType="slide" transparent={true} onRequestClose={toggleModal3}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent" }}>
            <View style={{ backgroundColor: '#FFFDFF', padding: 40, borderRadius: 10, borderColor: "gray", borderWidth: 1,justifyContent:"center",alignItems:"center"}}>
              <Text style={{ fontSize: 23, marginBottom: 20, fontWeight: "700", textAlign: "center" }}>Eliminar Material</Text>
              <SafeAreaView style={style.searchbar}>
                <TextInput onChangeText={handleSearchChange} style={{ marginTop: 9, fontSize: 18 }} placeholder='Buscar'
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
              <SafeAreaView style={{}} >
                <ScrollView style={{maxHeight:100}} showsVerticalScrollIndicator={false}>
                  {
                    filterData.map((item, index) => {
                      return (
                        <View key={index} style={[style.ViewData]}>
                          <View>
                            <TouchableOpacity style={{ backgroundColor: "#F0EEF0", borderColor: "black", borderWidth: 1, borderRadius: 15, marginBottom: 2,width:280,height:40,justifyContent:"center",alignItems:"center" }} onPress={() => addItemtoDelete(item)}>
                              <Text style={[style.TextData]}>{"$"}{item.precio}{"   "}{item.nombreMaterial}</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </SafeAreaView>
              <SafeAreaView style={{marginTop:50,backgroundColor:"gray",borderRadius:50,width:200,justifyContent:"center",alignItems:"center"}}>
                {
                  selectedItems.map((item, index) => {
                    return (
                      <View key={index}>
                        <SafeAreaView style={{ height: 50, justifyContent: "center",alignItems:"center" }}>
                          <Text style={[style.TextData, { fontSize: 18 }]} numberOfLines={1}>
                            {`${item.precio}${item.nombreMaterial}`.length > 20
                              ? `${"$"}${item.precio}${" "}${item.nombreMaterial}`.substring(0, 20) + '...'
                              : `${"$"}${item.precio}${" "}${item.nombreMaterial}`}
                          </Text>
                        </SafeAreaView>
                      </View>
                    )
                  })
                }
              </SafeAreaView>
              <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <TouchableOpacity onPress={handleDelete} style={{ marginTop: 20, marginRight: 20, backgroundColor: 'blue', height: 40, width: 100, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'red', height: 40, width: 100, borderRadius: 5, alignItems: "center", justifyContent: "center" }} onPress={toggleModal3}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>

  )
}

export default ConfigPage

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignContent: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'black'
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292'
  },
  SignOutBtn: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    marginHorizontal: 100,
    borderRadius: 30,
    marginBottom: 20,
  },
  configoptions: {
    alignItems: "flex-start",
    backgroundColor: "#F0EEF0",
    padding: 15,
    marginHorizontal: 35,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row"
  },
  textconfigOp: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3F3F44'
  },
  modal: {
    flex: 1,
    backgroundColor: "gray",
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  searchbar: {
    width: 300,
    height: 48,
    borderRadius: 30,
    backgroundColor: "#969FCF",
    marginTop:10,
    paddingLeft: 10,
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
    justifyContent:"center",
    alignItems:"center",
    flexDirection: "row",
    marginTop: 1,
  },
  TextData: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20

  },
})