import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


export default function App() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#304BB8', '#2C91A8',]} style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulos}>BIENVENIDO</Text>
        <Image style={{ width: 140, height: 120, marginTop: 20 }} source={require("../Images/presmatic.png")} />
        <Text style={[styles.subtitulos, { marginTop: 20 }]}>Inicia Sesion Para Continuar</Text>
        <TextInput style={styles.inputs} placeholder="Email" />
        <TextInput style={[styles.inputs, { marginTop: 15 }]} placeholder="Contraseña" secureTextEntry />
        <TouchableOpacity>
          <Text style={{ fontSize: 14, color: "white", marginTop: 5 }}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MyTabs")} style={styles.buttons}>
          <Text style={[styles.subtitulos, { marginTop: 5 }]}>INGRESAR</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", marginTop: 150 }}>¿Aun no tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ fontSize: 15, color: "black", marginTop: 5 }}>Crear Cuenta</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 180
  },
  titulos: {
    fontSize: 40,
    color: 'white',
    fontWeight: "bold",
  },
  subtitulos: {
    fontSize: 18,
    color: 'white',
    fontWeight: "bold"
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputs: {
    width: "80%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingLeft: 20,
    marginTop: 20
  },
  buttons: {
    width: "55%",
    height: 45,
    backgroundColor: '#194A94',
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  }
});
