import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

const Llamadas = () => {
  const [value, setValue] = useState("value");
  const { getItem, setItem } = useAsyncStorage("userName");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
    console.log("value" + value);
  };
  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <View style={styles.text}>
      <Text>Hola {value}</Text>
      <Button title="usuario" />
    </View>
  );
};

export default Llamadas;

const styles = StyleSheet.create({
  text: {
    flex: 2,
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 100,
    backgroundColor: "red",
  },
});
