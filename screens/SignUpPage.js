import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign, Foundation, FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPasword] = useState('');
  const [db, setDb] = useState(SQLite.openDatabase('presmatic.db'));

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) NOT NULL, mail VARCHAR(50) NOT NULL, password VARCHAR(20) NOT NULL)');
    });
    console.log(db);
  }, []);

  const onPressHandler = () => {
    let isValid = true; // Variable para verificar si todas las condiciones son válidas

    if (name.length <= 10) {
      isValid = false;
      Alert.alert('Cuidado', 'El nombre debe ser mayor a 10 caracteres', [
        { text: 'Ok' }
      ]);
    }

    const emailRegex = /^[\w-.]+@(gmail|outlook)\.com$/;
    if (!emailRegex.test(mail)) {
      isValid = false;
      Alert.alert('Cuidado', 'Ingrese un correo válido (ejemplo: ejemplo@gmail.com)', [
        { text: 'Ok' }
      ]);
    }

    if (password.length < 8) {
      isValid = false;
      Alert.alert('Cuidado', 'La contraseña debe ser mayor a 8 caracteres', [
        { text: 'Ok' }
      ]);
    }

    if (confirmPassword !== password) {
      isValid = false;
      Alert.alert('Cuidado', 'La contraseña no coincide', [
        { text: 'Ok' }
      ]);
    }

    if (isValid) {
      db.transaction(tx => {
        // Verificar si el correo o nombre ya existen en la base de datos
        tx.executeSql(
          'SELECT * FROM users WHERE mail = ? OR name = ?',
          [mail, name],
          (tx, result) => {
            if (result.rows.length > 0) {
              // Usuario con el mismo correo o nombre encontrado
              Alert.alert('Cuidado', 'El correo o nombre ya está registrado', [
                { text: 'Ok' }
              ]);
            } else {
              // No se encontró un usuario con el mismo correo o nombre, se puede realizar el registro
              tx.executeSql(
                'INSERT INTO users (name, mail, password) VALUES (?, ?, ?)',
                [name, mail, password],
                () => {
                  console.log('Registro insertado correctamente');
                  console.log('Nombre:', name);
                  console.log('Correo electrónico:', mail);
                  console.log('Contraseña:', password);
                  Alert.alert('Éxito', 'La cuenta se ha creado correctamente', [
                    { text: 'Ok' }
                  ]);

                  // Aquí puedes realizar las acciones necesarias para crear la cuenta
                },
                (error) => {
                  console.log('Error al insertar el registro:', error);
                }
              );
            }
          },
          (error) => {
            console.log('Error al consultar la base de datos:', error);
          }
        );
      });
    }
  };
  // Cerrar la conexión a la base de datos


  // Resto del código de la pantalla de registro

  return (
    <LinearGradient colors={['#304BB8', '#2C91A8',]} style={style.linearGradient}>
      <SafeAreaView style={[style.container]}>
        <Text style={[style.title]}>Crear Cuenta</Text>
        <SafeAreaView style={[style.inputs]}>
          <Ionicons name="person" size={20} color="black" style={{ marginRight: 10 }} />
          <TextInput style={{ flex: 1 }} onChangeText={(value) => setName(value)} placeholder='Nombre Completo' />
        </SafeAreaView>
        <SafeAreaView style={[style.inputs]}>
          <Foundation name="mail" size={20} color="black" style={{ marginRight: 10 }} />
          <TextInput style={{ flex: 1 }} onChangeText={(value) => setMail(value)} placeholder='Correo' />
        </SafeAreaView>
        <SafeAreaView style={[style.inputs]}>
          <FontAwesome name="lock" size={24} color="black" style={{ marginRight: 10 }} />
          <TextInput style={{ flex: 1 }} onChangeText={(value) => setPassword(value)} placeholder='Contraseña' />
        </SafeAreaView>
        <SafeAreaView style={[style.inputs]}>
          <FontAwesome name="lock" size={24} color="black" style={{ marginRight: 10 }} />
          <TextInput style={{ flex: 1 }} onChangeText={(value) => setconfirmPasword(value)} placeholder='Confirmar Contraseña' />
        </SafeAreaView>
        <TouchableOpacity onPress={onPressHandler} style={style.buttons}>
          <Text style={[style.subtitulos]}>Crear Cuenta</Text>
        </TouchableOpacity>

        <Text style={[style.textTCP]}>Al Crear Cuenta Acepta nuestros</Text>
        <Text style={[style.textTCP, { color: "#E6F75E" }]}>Terminos de Uso y Politicas de Privacidad</Text>
      </SafeAreaView>
    </LinearGradient>

  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  linearGradient: {
    flex: 1
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#CCD6D4"

  },
  inputs: {
    width: "80%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingLeft: 10,
    marginTop: 20,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center"
  },
  buttons: {
    width: "55%",
    height: 45,
    backgroundColor: '#194A94',
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  subtitulos: {
    fontSize: 18,
    color: 'white',
    fontWeight: "bold"
  },
  textTCP: {
    fontSize: 10,
    textAlign: 'center'
  }
})