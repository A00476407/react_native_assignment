import { Text, View } from "react-native";
import { styles } from "../stylesheets/stylesheet";
import { useState, useEffect } from "react";
import { SavedLocationList } from "../components/SavedLocationList";
import { DataTable, Button } from "react-native-paper";

export function SavedLocationScreen() {
  const [error, setError] = useState(false);
  
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <SavedLocationList />
        {error && <Text style={{ color: "red" }}>An error has occurred!</Text>}
      </View>
    </View>
  );
}
