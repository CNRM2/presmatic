import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign,Foundation,FontAwesome } from '@expo/vector-icons';

export default function SignUpPage() {
  return (
    <LinearGradient colors={['#304BB8', '#2C91A8',]} style={style.linearGradient}>
      <SafeAreaView style={[style.container]}>
        <Text style={[style.title]}>Crear Cuenta</Text>
        <SafeAreaView style={[style.inputs]}>
          <Ionicons name="person" size={20} color="black" style={{marginRight:10}} />
          <TextInput placeholder='Nombre Completo' />
        </SafeAreaView>
        <SafeAreaView style={[style.inputs]}>
        <Foundation name="mail" size={20} color="black" style={{marginRight:10}} />
          <TextInput placeholder='Correo' />
        </SafeAreaView>
        <SafeAreaView style={[style.inputs]}>
        <FontAwesome name="lock" size={24} color="black" style={{marginRight:10}} />
          <TextInput placeholder='Contraseña' />
        </SafeAreaView>
        <SafeAreaView style={[style.inputs]}>
        <FontAwesome name="lock" size={24} color="black" style={{marginRight:10}} />
          <TextInput placeholder='Confirmar Contraseña' />
        </SafeAreaView>
        <TouchableOpacity  style={style.buttons}>
          <Text style={[style.subtitulos]}>Crear Cuenta</Text>
        </TouchableOpacity>

        <Text style={[style.textTCP]}>Al Crear Cuenta Acepta nuestros</Text>
        <Text style={[style.textTCP,{color:"#E6F75E"}]}>Terminos de Uso y Politicas de Privacidad</Text>
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
    color:"#CCD6D4"

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
    alignItems:"center"
  },
  buttons: {
    width: "55%",
    height: 45,
    backgroundColor: '#194A94',
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
    justifyContent:"center"
  },
  subtitulos: {
    fontSize: 18,
    color: 'white',
    fontWeight: "bold"
  },
  textTCP: {
    fontSize:10,
    textAlign:'center'
  }
})