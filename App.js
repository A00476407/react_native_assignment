import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { styles } from "./stylesheets/stylesheet";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen } from "./screens/HomeScreen";
import { SavedLocationScreen } from "./screens/SavedLocationScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { SafeAreaView } from "react-native";
import * as SQLite from "expo-sqlite";
import { createContext, useEffect, useState } from "react";

const Tab = createMaterialTopTabNavigator();

function getDatabase() {
  // Error handling, in case the platform is web (expo-sqlite does not support web)
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("myDb.db");
  // console.log(db);
  return db;
}

const db = getDatabase();
export const myContext = createContext();


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    // Create table `items` (if does not exist)
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS savedLocation (id INTEGER PRIMARY KEY NOT NULL, city TEXT, country TEXT, admin1 TEXT, longitude REAL, latitude REAL);",
        (message) => console.log(message) // callback
      );
    });
  
    // Select all data from table `todos`
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM savedLocation;`,
        [],
        (_, { rows: { _array } }) => setList(_array)
      );
    });
    console.log(list);
  }, []);
  return (
    <myContext.Provider value={{list, setList}}>
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Saved Location" component={SavedLocationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </myContext.Provider>
  );
}
