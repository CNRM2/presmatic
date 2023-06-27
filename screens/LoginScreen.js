import React from "react";
import { View, Text, Button, TouchableOpacity,TextInput } from "react-native";
import { Component } from "react";
import { StyleSheet } from "react-native";
import customFontStyles from "../theme/styles";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'



const Loginscreen = () => {
    const  navigation = useNavigation();
    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');
    return (
        <KeyboardAwareScrollView style={{backgroundColor:"#235BCC", flex:1}}>
          <View style={{alignItems:"center", marginTop:70}}>
               <Text 
                  style={[customFontStyles.title,{ fontSize: 50,textAlign: "center",marginTop: 100}]}>
                  BIENVENIDO
               </Text>
               <View style={{alignItems:"center", paddingTop:20}}>
                  <Image source={require("../Images/presmatic.png")}
                   style={{width: 200,height:180}} />
               </View>
                    <TextInput style={[customFontStyles.textInput,{marginTop:50}]} placeholder="Correo"/>
                    <TextInput style={[customFontStyles.textInput]} placeholder="Contraseña"
                    secureTextEntry={true}/>  
               <View style={{paddingTop:10}}>
                    <TouchableOpacity >
                       <Text 
                       style={[customFontStyles.text,{color:'white', textAlign:"center"}]}>Olvidaste la contraseña?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} 
                          style={{borderRadius:15, 
                          backgroundColor: "black", padding:10, alignItems:"center",marginTop:40}}>
                        <Text style={customFontStyles.title}>Iniciar Sesion</Text>
                    </TouchableOpacity>
               </View>
               <View>
                  <Text style={[customFontStyles.subtitle]}>
                    Aun no tienes una cuenta?
                  </Text>
                  <TouchableOpacity>
                    <Text style={[customFontStyles.subtitle,{color:"orange"}]} onPress={() => navigation.navigate("SignUp")} >
                        Registrate Aqui
                    </Text>
                  </TouchableOpacity>
               </View>
            </View>
        </KeyboardAwareScrollView>
        
    )
};
export default Loginscreen;

