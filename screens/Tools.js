import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'

const Tools = () => {
  return (
    <SafeAreaView style={style.container}>
      <SafeAreaView style={style.buttons}>
        <SafeAreaView style={style.button}>
          <Text>
            Crear Formato
          </Text>
          <Text>
            de Presupuesto
          </Text>
        </SafeAreaView>
        <SafeAreaView style={[style.button,{marginLeft:20}]}>
          <Text>
            Crear Formato
          </Text>
          <Text>
            de Entrega
          </Text>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default Tools;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 15,
    alignItems:"center",
    

  }

})