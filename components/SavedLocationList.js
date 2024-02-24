import { useContext, useEffect, useState } from "react";
import { Platform, View, Text, Image } from "react-native";
import { styles } from "../stylesheets/stylesheet";
import { DataTable, Button } from "react-native-paper";
import Weather from "../components/Weather";
import * as SQLite from "expo-sqlite";
import { myContext } from "../App";

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
  return db;
}

const db = getDatabase();

export const SavedLocationList = () => {
  const {list, setList} = useContext(myContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    weatherCode: 0,
    apparentTemperature: 0,
    isDay: 0,
    relativeHumidity: 0,
    minTemp: 0,
    maxTemp: 0,
    sunrise: "",
    sunset: "",
  });
  const [selectedLocationData, setSelectedLocationData] = useState({
    id: 0,
    city: "",
    country: "",
    admin1: "",
    longitude: 0,
    latitude: 0,
  });

  const fetchWeather = (latitude = 25, longitude = 25, item) => {
    fetch(
      `http://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=1`
    )
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        setWeatherData({
          temperature: json.current.temperature_2m,
          weatherCode: json.current.weather_code,
          apparentTemperature: json.current.apparent_temperature,
          isDay: json.current.is_day,
          relativeHumidity: json.current.relative_humidity_2m,
          minTemp: json.daily.temperature_2m_min[0],
          maxTemp: json.daily.temperature_2m_max[0],
          sunrise: json.daily.sunrise[0],
          sunset: json.daily.sunset[0],
        });
        setSelectedLocationData({
          id: item.id,
          city: item.city,
          country: item.country,
          admin1: item.admin1,
          longitude: longitude,
          latitude: latitude,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  const removeList = () => {
    setList((currentList) => {
      return currentList.filter((list) => list.id !== selectedLocationData.id);
    });

    // Remove `todoText` with that specific `id` from database
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM savedLocation WHERE id = ?;`, [selectedLocationData.id]);
    });
  };

  return (
    <View>
      <View style={{ height: 220 }}>
        <Text style={styles.smallText}>1. Search a specified city</Text>
        <Text style={styles.smallText}>
          2. Select a city to show the temperature
        </Text>
        <Text style={styles.smallText}>
          3. Click the button to save the location
        </Text>
        {isLoading ? (
          <Text style={styles.loadingText}>{"\n"}Waiting...</Text>
        ) : (
          <Weather weatherData={weatherData} />
        )}
      </View>
      <View style={styles.button}>
        <Button mode="outlined" onPress={removeList}>
          Remove
        </Button>
      </View>
      <View>
        <DataTable>
          <DataTable.Header style={{ height: "auto" }}>
            <DataTable.Title numberOfLines={8}>City Name</DataTable.Title>
            <DataTable.Title numberOfLines={8}>Country</DataTable.Title>
            <DataTable.Title numberOfLines={8}>Admin1</DataTable.Title>
          </DataTable.Header>
          {list.map((item) => (
            <DataTable.Row
              key={item.id}
              onPress={() => fetchWeather(item.latitude, item.longitude, item)}
            >
              <DataTable.Cell>{item.city}</DataTable.Cell>
              <DataTable.Cell>{item.country}</DataTable.Cell>
              <DataTable.Cell>{item.admin1}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
};
