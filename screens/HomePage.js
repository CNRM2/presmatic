import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Flexbox } from 'react-native'
import React, { useState } from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MyTabs from '../navigation'

export default function HomePage() {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#304BB8', '#2C91A8',]} style={style.linearGradient}>
      <SafeAreaView style={[style.container, { flex: 1,marginTop:50}]}>
        <View style={{ alignItems: "center" }}>
          <Image style={{ width: 180, height: 160, marginTop: 40 }} source={require("../Images/presmatic.png")} />
        </View>
        <SafeAreaView style={[style.historial]}>
          <Text style={[style.text, { textAlign: "center" }]}>Historial</Text>
          <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Aeropuerto</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Buenos Aires</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Huatabampo</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Etchojoa</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Tijuana</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Huatabampo</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Buenos Aires</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Buenos Aires</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Buenos Aires</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Buenos Aires</Text>
            </View>
            <View style={[style.formatdata]}>
              <Text style={[style.texthistorial]}>Presupuesto Buenos Aires</Text>
            </View>
          </ScrollView>
        </SafeAreaView>

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
    height:60,
    alignItems: "center",
    borderRadius: 15,
    marginTop: 70,
  },
  textOptions: {
    color: "black",
    fontSize: 15,
    marginTop: 5,
    textAlign:"center"
  },
  buttonbox: {
    flexDirection: "row"
  }
});