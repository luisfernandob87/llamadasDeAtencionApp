import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import Login from "./screens/Login";
import Llamadas from "./screens/Llamadas";
import Menu from "./screens/Menu";
import Empleados from "./screens/Empleados";
import AgregarEmpleado from "./screens/AgregarEmpleado";

const AddStack = createNativeStackNavigator();

function MyStack() {
  return (
    <AddStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerBackTitleStyle: false, headerShown: true }}
    >
      <AddStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AddStack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
        }}
      />
      <AddStack.Screen
        name="Llamadas"
        component={Llamadas}
        options={{
          title: "Registrar Llamada de Atención",
          headerTitleAlign: "center",
          headerTintColor: "#1976d2",
        }}
      />
      <AddStack.Screen
        name="Empleados"
        component={Empleados}
        options={{
          title: "Administrar Empleados",
          headerTitleAlign: "center",
          headerTintColor: "#1976d2",
        }}
      />
      <AddStack.Screen
        name="AgregarEmpleado"
        component={AgregarEmpleado}
        options={{
          title: "Agregar Empleado",
          headerTitleAlign: "center",
          headerTintColor: "#1976d2",
        }}
      />
    </AddStack.Navigator>
  );
}
export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
