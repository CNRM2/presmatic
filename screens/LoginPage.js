import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as SQLITE from 'expo-sqlite';

export default function App() {
  const navigation = useNavigation();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [db, setDb] = useState(SQLITE.openDatabase('presmatic.db'));

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) NOT NULL, mail VARCHAR(50) NOT NULL, password VARCHAR(20) NOT NULL)');
    });
    console.log(db)
  }, []);

  const onPressHandler = () => {
    console.log(db)
    let isValid = true;
    const emailRegex = /^[\w-.]+@(gmail|outlook)\.com$/;
    if (!emailRegex.test(mail)) {
      isValid = false;
      Alert.alert('Cuidado', 'Ingrese un correo válido (ejemplo: ejemplo@gmail.com)', [
        { text: 'Ok' }
      ]);
    }

    if (password.length < 8) {
      isValid = false;
      Alert.alert('Cuidado', 'La contraseña debe de ser mayor a 8 caracteres', [
        { text: 'Ok' }
      ]);
    }

    if (isValid) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE mail = ? AND password = ?',
          [mail, password],
          (tx, result) => {
            // Verificar si se encontró algún resultado
            if (result.rows.length > 0) {
              setPassword('');
              setMail('');
              // Usuario encontrado, puedes realizar las acciones necesarias
              console.log('Inicio de sesión exitoso');
              navigation.navigate('MyTabs');
            } else {
              // Usuario no encontrado, mostrar mensaje de error o tomar alguna acción
              console.log('Credenciales incorrectas');
              Alert.alert('Cuidado', 'Credenciales incorrectas', [
                { text: 'Ok' }
              ]);
            }
          },
          (error) => {
            // Error al ejecutar la consulta
            console.log('Error al consultar la base de datos', error);
          }
        );
      });
    }
  };
  return (
    <LinearGradient colors={['#304BB8', '#2C91A8',]} style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulos}>BIENVENIDO</Text>
        <Image style={{ width: 140, height: 120, marginTop: 20 }} source={require("../Images/presmatic.png")} />
        <Text style={[styles.subtitulos, { marginTop: 20 }]}>Inicia Sesion Para Continuar</Text>
        <TextInput value={mail} onChangeText={setMail} style={[styles.inputs]} placeholder="Email" />
        <TextInput value={password} onChangeText={setPassword} style={[styles.inputs, { marginTop: 15 }]} placeholder="Contraseña" secureTextEntry />
        <TouchableOpacity>
          <Text style={{ fontSize: 14, color: "white", marginTop: 5 }}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHandler} style={styles.buttons}>
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
