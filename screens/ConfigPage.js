import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacityBase, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-ionicons'
import { Fontisto, MaterialCommunityIcons, MaterialIcons,Ionicons,Entypo,AntDesign } from '@expo/vector-icons';

const ConfigPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#FFFDFF"}}>
      <Text style={[style.title,{marginLeft:30,marginTop:50}]}>Configuraciones</Text>
      <ScrollView style={[style.container]}>
        <Text style={[style.subtitle,{marginTop:1,marginLeft:40}]}>Inicio de Sesion</Text>
        <TouchableOpacity style={[style.configoptions]}>
          <Fontisto style={{marginRight:10}} name='person' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Datos Personales</Text>
        </TouchableOpacity>
        <Text style={[style.subtitle,{marginTop:10,marginLeft:40}]}>Materiales y Presupuestos</Text>
        <TouchableOpacity style={[style.configoptions]}>
          <Ionicons style={{marginRight:10}} name='add' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Agregar Material</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <Entypo style={{marginRight:10}} name='edit' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Actualizar Material</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <AntDesign style={{marginRight:10}} name='delete' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Eliminar Material</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <MaterialCommunityIcons style={{marginRight:10}} name='file-import-outline' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Importar Lista de Materiales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <MaterialIcons style={{marginRight:10}} name='drive-file-move-outline' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Ruta de Guardado</Text>
        </TouchableOpacity>
        <Text style={[style.subtitle,{marginTop:10,marginLeft:40}]} >Ayuda</Text>
        <TouchableOpacity style={[style.configoptions]}>
          <MaterialIcons style={{marginRight:10}} name='bug-report' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Reportar Bugs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.configoptions]}>
          <Ionicons style={{marginRight:10}} name='md-mail' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Contactanos</Text>
        </TouchableOpacity>
        <Text style={[style.subtitle,{marginTop:10,marginLeft:40}]} >App</Text>
        <TouchableOpacity style={[style.configoptions]}>
          <Fontisto style={{marginRight:10}} name='persons' size={24} color={"black"}/>
          <Text style={[style.textconfigOp]}>Acerca de Nosotros</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[style.SignOutBtn]}>
        <Text style={[style.subtitle,{color:"#E5E5EA"}]}>Cerrar Sesion</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default ConfigPage

const style = StyleSheet.create({
  container:{
     paddingVertical:10,
     alignContent:"flex-start",
  },
  title:{
    fontSize:32,
    fontWeight:'700',
    color:'black'
  },
  subtitle: {
    fontSize:15,
    fontWeight:'500',
    color:'#929292'
  },
  SignOutBtn:{
    alignItems:"center",
    backgroundColor:"black",
    padding:15,
    marginHorizontal:100,
    borderRadius:30,
    marginBottom:20,
  },
  configoptions: {
    alignItems:"flex-start",
    backgroundColor:"#F0EEF0",
    padding:15,
    marginHorizontal:35,
    borderRadius:10,
    marginBottom:10,
    flexDirection:"row"
  },
  textconfigOp:{
    fontSize:18,
    fontWeight:'500',
    color:'#3F3F44'
  }
})