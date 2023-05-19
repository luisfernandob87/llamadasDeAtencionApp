import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AgregarEmpleado = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");

  const [value, setValue] = useState("");
  const { getItem, setItem } = useAsyncStorage("token");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
  };
  readItemFromStorage();

  const dataJson = {
    data: {
      nombreCompleto: nombre,
    },
  };
  //
  const config = {
    headers: {
      Authorization: "Bearer " + value,
    },
  };
  const submit = () => {
    //
    console.log(config);
    console.log(dataJson);

    axios
      .post("http://192.168.1.19:1337/api/empleados", dataJson, config)
      .then((res) => console.log(res));
    navigation.navigate("Menu");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        value={nombre}
        placeholder="Nombre Completo"
        onChangeText={setNombre}
      />
      <Button style={styles.btnSubmit} title="Crear" onPress={submit} />
    </View>
  );
};

export default AgregarEmpleado;

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
    width: 300,
    borderRadius: 10,
  },
});
