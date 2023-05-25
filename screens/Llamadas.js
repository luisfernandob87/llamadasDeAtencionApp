import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Modal,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";
import { SelectList } from "react-native-dropdown-select-list";
import Signature from "react-native-signature-canvas";

const Llamadas = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleJefeInmediato, setModalVisibleJefeInmediato] =
    useState(false);
  const [modalVisibleRrhh, setModalVisibleRrhh] = useState(false);

  const [selected, setSelected] = React.useState("");
  const [selectedDepto, setSelectedDepto] = React.useState("");
  const [selectedPuesto, setSelectedPuesto] = React.useState("");
  const [selectedGrado, setSelectedGrado] = React.useState("");
  const [data, setData] = React.useState([]);
  const [dataDepto, setDataDepto] = React.useState([]);
  const [dataPuesto, setDataPuesto] = React.useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [compromiso, setCompromiso] = useState("");
  const [accionCorrectiva, setAccionCorrectiva] = useState("");
  const [proximoGrado, setProximoGrado] = useState("");
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const datosGrado = [
    { key: "Llamada de atención verbal", value: "Llamada de atención verbal" },
    {
      key: "Llamada de atención escrita",
      value: "Llamada de atención escrita",
    },
    { key: "Suspensión", value: "Suspensión" },
  ];

  useEffect(() => {
    getMultiple = async () => {
      let values;
      try {
        values = await AsyncStorage.multiGet(["token", "userName"]);
      } catch (e) {}
      const token = values[0][1];
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get("http://192.168.1.19:1337/api/empleados", config)
        .then((res) => {
          let newArray = res.data.data.map((item) => {
            return { key: item.id, value: item.attributes.nombreCompleto };
          });
          setData(newArray);
        });
      axios
        .get("http://192.168.1.19:1337/api/departamentos", config)
        .then((res) => {
          let newArray = res.data.data.map((item) => {
            return { key: item.id, value: item.attributes.descripcion };
          });
          setDataDepto(newArray);
        });
      axios.get("http://192.168.1.19:1337/api/puestos", config).then((res) => {
        let newArray = res.data.data.map((item) => {
          return { key: item.id, value: item.attributes.descripcion };
        });
        setDataPuesto(newArray);
      });
    };
    getMultiple();
  }, []);

  //
  const [firmaColaborador, setFirmaColaborador] = useState("");
  const [firmaJefe, setFirmaJefe] = useState("");
  const [firmaRrhh, setFirmaRrhh] = useState("");
  //

  const [value, setValue] = useState("");
  const { getItem, setItem } = useAsyncStorage("token");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
  };
  readItemFromStorage();

  const config = {
    headers: {
      Authorization: "Bearer " + value,
    },
  };

  const submit = () => {
    const dataJson = {
      data: {
        departamento: {
          id: selectedDepto,
        },
        empleado: {
          id: selected,
        },
        puesto: {
          id: selectedPuesto,
        },
        grado: selectedGrado,
        descripcion: descripcion,
        accionCorrectiva: accionCorrectiva,
        compromiso: compromiso,
        // creadoPor: usuario,
        firmaJefeInmediato: firmaJefe,
        firmaRrhh: firmaRrhh,
        firmaColaborador: firmaColaborador,
        // fechaImplementacion: data.fechaImplementacion,
        // inicioCompromiso: data.fechaInicioCompromiso,
        // finalCompromiso: data.fechaFinalCompromiso,
        proximoGrado: proximoGrado,
      },
    };
    // console.log(dataJson);
    // console.log(config);
    axios
      .post(
        "http://192.168.1.19:1337/api/llamadade-atencions",
        dataJson,
        config
      )
      .then((res) => console.log(res));
    navigation.navigate("Menu");
  };

  const fecha = moment(new Date()).format("DD/MM/YYYY");

  return (
    <>
      <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={{ padding: 10, textAlign: "center" }}>
          FORMATO DE ASESORÍA PARA MEJORAR
        </Text>
        <Text style={{ padding: 10 }}>Fecha: {fecha}</Text>
        <View style={{ padding: 10 }}>
          <SelectList
            setSelected={setSelected}
            data={data}
            placeholder="Nombre colaborador (a):"
            searchPlaceholder="Buscar"
          />
        </View>
        <View style={{ padding: 10 }}>
          <SelectList
            setSelected={setSelectedDepto}
            data={dataDepto}
            placeholder="Departamento:"
            searchPlaceholder="Buscar"
          />
        </View>
        <View style={{ padding: 10 }}>
          <SelectList
            setSelected={setSelectedPuesto}
            data={dataPuesto}
            placeholder="Puesto:"
            searchPlaceholder="Buscar"
          />
        </View>
        <View style={{ padding: 10 }}>
          <SelectList
            setSelected={setSelectedGrado}
            data={datosGrado}
            placeholder="Tipo de Llamada de Atención: "
            searchPlaceholder="Buscar"
          />
        </View>
        <TextInput
          style={styles.input}
          value={descripcion}
          placeholder="Descripción"
          onChangeText={setDescripcion}
        />
        <TextInput
          style={styles.input}
          value={accionCorrectiva}
          placeholder="Acción Correctiva"
          onChangeText={setAccionCorrectiva}
        />
        <TextInput
          style={styles.input}
          value={compromiso}
          placeholder="Compromiso"
          onChangeText={setCompromiso}
        />
        <TextInput
          style={styles.input}
          value={proximoGrado}
          placeholder="Próximo llamado de atención"
          onChangeText={setProximoGrado}
        />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Firma Colaborador</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
                <ScrollView scrollEnabled={scrollEnabled}>
                  <View
                    style={{
                      height: 350,
                      width: 400,
                      alignItems: "center",
                    }}
                  >
                    <Signature
                      onOK={(img) => setFirmaColaborador(img)}
                      onBegin={() => setScrollEnabled(false)}
                      onEnd={() => setScrollEnabled(true)}
                      descriptionText="Firma Colaborador"
                      clearText="Borrar"
                      confirmText="Guardar"
                      imageType="image/png"
                      dotSize="0.5"
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <View style={styles.containerButton}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Firma Colaborador</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleJefeInmediato}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisibleJefeInmediato(!modalVisibleJefeInmediato);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Firma Jefe Inmediato</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>
                    setModalVisibleJefeInmediato(!modalVisibleJefeInmediato)
                  }
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
                <ScrollView scrollEnabled={scrollEnabled}>
                  <View
                    style={{
                      height: 350,
                      width: 400,
                      alignItems: "center",
                    }}
                  >
                    <Signature
                      onOK={(img) => setFirmaJefe(img)}
                      onBegin={() => setScrollEnabled(false)}
                      onEnd={() => setScrollEnabled(true)}
                      descriptionText="Firma Jefe Inmediato"
                      clearText="Borrar"
                      confirmText="Guardar"
                      imageType="image/png"
                      dotSize="0.5"
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <View style={styles.containerButton}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisibleJefeInmediato(true)}
            >
              <Text style={styles.textStyle}>Firma Jefe Inmediato</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleRrhh}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisibleRrhh(!modalVisibleRrhh);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Firma RRHH o Testigo</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisibleRrhh(!modalVisibleRrhh)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
                <ScrollView scrollEnabled={scrollEnabled}>
                  <View
                    style={{
                      height: 350,
                      width: 400,
                      alignItems: "center",
                    }}
                  >
                    <Signature
                      onOK={(img) => setFirmaRrhh(img)}
                      onBegin={() => setScrollEnabled(false)}
                      onEnd={() => setScrollEnabled(true)}
                      descriptionText="Firma RRHH o Testigo"
                      clearText="Borrar"
                      confirmText="Guardar"
                      imageType="image/png"
                      dotSize="0.5"
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <View style={styles.containerButton}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisibleRrhh(true)}
            >
              <Text style={styles.textStyle}>Firma RRHH o Testigo</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Button title="Crear" onPress={submit} />
    </>
  );
};

export default Llamadas;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: 500,
    width: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  containerButton: {
    width: "100%",
  },
  buttonOpen: {
    backgroundColor: "#1976d2",
  },
  buttonClose: {
    backgroundColor: "#1976d2",
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
  },
});
