import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "./stylesheets/stylesheet";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen } from "./screens/HomeScreen";
import { SavedLocationScreen } from "./screens/SavedLocationScreen";
import { SafeAreaView } from "react-native";

const Tab = createMaterialTopTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SettingsScreen} />
          <Tab.Screen name="Saved Location" component={SavedLocationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
