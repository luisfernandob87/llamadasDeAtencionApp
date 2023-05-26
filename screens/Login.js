import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/Logotipo_Anvar_300.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    identifier: usuario,
    password: password,
  };

  AsyncStorage.clear();

  const submit = () => {
    if (usuario == "" || password == "") {
      Alert.alert("Ingrese usuario y contraseña");
    } else {
      axios
        .post("https://anvar-demo.onrender.com/api/auth/local", data)
        .then((res) => {
          const usr = ["userName", res.data.user.username];
          const tkn = ["token", res.data.jwt];
          try {
            AsyncStorage.multiSet([usr, tkn]);
          } catch (error) {
            console.log("Done.");
          }
          navigation.navigate("Menu");
        });
    }
    setPassword("");
    setUsuario("");
  };
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <TextInput
        style={styles.inputs}
        value={usuario}
        placeholder="Usuario"
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.inputs}
        value={password}
        secureTextEntry={true}
        placeholder="Contraseña"
        onChangeText={setPassword}
      />
      <Button style={styles.btnSubmit} title="Acceder" onPress={submit} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnSubmit: {
    backgroundColor: "#1976d2",
  },
  inputs: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});
