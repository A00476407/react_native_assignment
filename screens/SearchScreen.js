import { useState } from "react";
import { Platform, Text, View } from "react-native";
import { styles } from "../stylesheets/stylesheet";
import { LocationList } from "../components/LocationList";
import { Searchbar } from "react-native-paper";
import * as SQLite from "expo-sqlite";

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

export function SearchScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationData, setLocationData] = useState([]);

  const fetchLocation = (searchQuery = "") => {
    setIsLoading(true);
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=5&language=en&format=json`
    )
      .then((res) => res.json())
      .then((json) => {
        //console.log(json.results);
        if (!json.results) {
          setIsLoading(false);
          return;
        } else setLocationData(json.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="City Name Search"
          onChangeText={setSearchQuery}
          onSubmitEditing={() => fetchLocation(searchQuery)}
          value={searchQuery}
        />
        {isLoading ? (
          <Text style={styles.loadingText}>Fetching the location data...</Text>
        ) : (
          <LocationList locationData={locationData} />
        )}
        {error && <Text style={{ color: "red" }}>An error has occurred!</Text>}
      </View>
    </View>
  );
}
