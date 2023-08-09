import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Modal, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import * as SQLITE from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

export default function HomePage() {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [nombrePresupuesto, setNombrePresupuesto] = useState();
  const [ordenTrabajo, setOrdendeTrabajo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [presupuestos, setPresupuestos] = useState([]);
  const [db, setDb] = useState(SQLITE.openDatabase('materials.db'));

  useFocusEffect(
    React.useCallback(() => {
      fetchLocalData();
      return () => {

      }
    }, []
    ));

  const fetchLocalData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM presupuestos',
        [],
        (tx, result) => {
          const items = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            items.push({
              nombrePresupuesto: row.nombrePresupuesto,
              ordenTrabajo: row.ordenTrabajo
            });
          }
          setPresupuestos(items);
        },
        (error) => {
          console.log('Error al obtener los datos de la base de datos:', error);
        }
      );
    });
  };

  const onPressHandler = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO presupuestos (nombrePresupuesto, ordenTrabajo, descripcion) VALUES (?, ?, ?)',
        [nombrePresupuesto, parseInt(ordenTrabajo), descripcion],
        (_, result) => {
          console.log('Presupuesto creado correctamente');
          console.log('Nombre del presupuesto:', nombrePresupuesto);
          console.log('Orden de trabajo:', ordenTrabajo);
          console.log('Descripción:', descripcion);
          navigation.navigate('NewBudget');
          Alert.alert('Éxito', 'El presupuesto se ha creado correctamente', [
            { text: 'Ok' }
          ]);
          // Realizar acciones adicionales después de la creación del presupuesto
        },
        (_, error) => {
          console.log('Error al crear el presupuesto:', error);
        }
      );
    },
      (error) => {
        console.log('Error al consultar la base de datos:', error);
      });
  };


  const toggleModal1 = () => {
    setModalVisible1(!modalVisible1);
  };
  return (
    <LinearGradient colors={['#304BB8', '#2C91A8',]} style={style.linearGradient}>
      <SafeAreaView style={[style.container, { flex: 1, marginTop: 50 }]}>
        <View style={{ alignItems: "center" }}>
          <Image style={{ width: 180, height: 160, marginTop: 40 }} source={require("../Images/presmatic.png")} />
        </View>
        <SafeAreaView style={[style.historial]}>
          <Text style={[style.text, { textAlign: "center" }]}>Historial</Text>
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 10, marginVertical: 10 }}>
            {presupuestos.map((presupuesto, index) => (
              <TouchableOpacity key={index} style={{ backgroundColor: "#FFFDFF", borderRadius: 10, marginBottom: 2, borderColor: "gray", borderWidth: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 5 }}>
                  {presupuesto.nombrePresupuesto},{presupuesto.ordenTrabajo}
                </Text>
              </TouchableOpacity>

            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => toggleModal1(true)} style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "lightblue", height: 40 }}>
            <Text style={{ fontSize: 15, fontWeight: "700" }}>
              Agregar Presupuesto
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        {/* Modal Crear Presupuestp */}
        <Modal visible={modalVisible1} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent" }}>
            <View style={{ backgroundColor: '#FFFDFF', padding: 40, borderRadius: 10, borderColor: "gray", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 20 }}>Crear Nuevo Presupuesto</Text>
              <TextInput onChangeText={(value) => setNombrePresupuesto(value)} style={{ borderRadius: 15, height: 50, backgroundColor: "#F0EEF0", marginBottom: 10, width: 250, textAlign: "justify" }} placeholder={"Nombre del presupuesto"} />
              <TextInput onChangeText={(value) => setOrdendeTrabajo(value)} style={{ borderRadius: 15, height: 50, backgroundColor: "#F0EEF0", marginBottom: 10, width: 250 }} placeholder='W.O' keyboardType="number-pad" />
              <TextInput onChangeText={(value) => setDescripcion(value)} style={{ borderRadius: 15, height: 50, backgroundColor: "#F0EEF0", marginBottom: 10, width: 250 }} placeholder={"Descripción del presupuesto"} multiline={true} />

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={onPressHandler} style={{ backgroundColor: "lightblue", width: 120, height: 60, borderRadius: 15, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                  <Text style={{ textAlign: "center" }}>
                    Crear presupuesto
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal1} style={{ backgroundColor: "red", width: 120, height: 60, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
                  <Text>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold"
  },
  searchbar: {
    width: 380,
    height: 48,
    borderRadius: 30,
    backgroundColor: "#969FCF",
    marginTop: 50,
    paddingLeft: 10,
  },
  linearGradient: {
    flex: 1,
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
  historial: {
    flexDirection: "column",
    backgroundColor: "#F0EEF0",
    width: 300,
    height: 320,
    marginTop: 50,
    marginBottom: 80,
    borderRadius: 20,
  },
  texthistorial: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10
  },
  formatdata: {
    backgroundColor: "#F0EEF0",
    padding: 10,
    marginBottom: 1,
    borderColor: "#9D9DA0",
    borderWidth: 1,
    borderRadius: 15

  },
  Options: {
    backgroundColor: "#DBDCE3",
    padding: 5,
    marginHorizontal: 105,
    height: 60,
    alignItems: "center",
    borderRadius: 15,
    marginTop: 70,
  },
  textOptions: {
    color: "black",
    fontSize: 15,
    marginTop: 5,
    textAlign: "center"
  },
  buttonbox: {
    flexDirection: "row"
  }
});