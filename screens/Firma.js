import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

const Sign = ({ onOK }) => {
  const [data, setData] = useState("");

  const ref = useRef();

  const handleOK = (signature) => {
    setData(signature);
    onOK(signature);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log("end");
    ref.current.readSignature();
  };

  console.log("midata" + data);

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
      <View style={styles.row}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
