import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../stylesheets/stylesheet";
import * as Location from "expo-location";
import Weather from "../components/Weather";
import { Button } from 'react-native-paper';

export function SearchScreen() {
  const [isLoading, setIsLoading] = useState(false);
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
    sunset: ""
  });

  const fetchWeather = (latitude = 25, longitude = 25) => {
    fetch(
      `http://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=1`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setWeatherData({
          temperature: json.current.temperature_2m,
          weatherCode: json.current.weather_code,
          apparentTemperature: json.current.apparent_temperature,
          isDay: json.current.is_day,
          relativeHumidity: json.current.relative_humidity_2m,
          minTemp: json.daily.temperature_2m_min[0],
          maxTemp: json.daily.temperature_2m_max[0],
          sunrise: json.daily.sunrise[0],
          sunset: json.daily.sunset[0]
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  useEffect(() => {
    /// Wrapped with an async scope because we're using await in useEffect
    (async () => {
      setIsLoading(true);

      // Get Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      // Get location (if permission granted)
      let location = await Location.getCurrentPositionAsync({});

      // Fetch Weather data from location's latitude and longitude
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  console.log("testing" , weatherData);
  return (
    <View style={styles.container}>
      <Text>City</Text>
      <Button icon="search-location" type="font-awesome-5" mode="contained" onPress={() => console.log('Pressed')}>
    Search
  </Button>
      {error && <Text style={{ color: "red" }}>An error has occurred!</Text>}
    </View>
  );
}
