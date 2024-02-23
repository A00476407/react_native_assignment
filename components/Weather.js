import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DataTable } from "react-native-paper";
import data from "./WeatherCodeDescriptions.json";
import { Icon } from "@rneui/themed";

const Weather = ({ weatherData }) => {
  //console.log(weatherData.weatherCode);
  //console.log(data[weatherData.weatherCode]);
  return (
    <View style={styles.weatherContainer}>
      <View>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell style={styles.cell}>
              <View style={styles.rowViewContainer}>
                <View>
                  {weatherData.isDay ? (
                    <Image
                      source={{ uri: data[weatherData.weatherCode].day.image }}
                      style={styles.weatherImage}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: data[weatherData.weatherCode].night.image,
                      }}
                      style={styles.weatherImage}
                    />
                  )}
                </View>
                <View style={styles.columnViewContainer}>
                  <View style={styles.cell}>
                    <Text style={styles.subtitle}>
                      {data[weatherData.weatherCode].day.description}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.subtitle}>
                      {weatherData.temperature}˚C
                    </Text>
                  </View>
                </View>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.rowDataTable}>
            <DataTable.Cell style={styles.cell}>
              <View style={styles.rowViewContainer}>
                <View>
                  <Icon
                    name="thermometer-three-quarters"
                    type="font-awesome-5"
                    color="#808080"
                    size={30}
                  />
                </View>
                <View style={styles.columnViewContainer}>
                  <View style={styles.smallTextCell}>
                    <Text style={styles.smallText}>
                      {" "}
                      L: {weatherData.minTemp}˚C
                    </Text>
                  </View>
                  <View style={styles.smallTextCell}>
                    <Text style={styles.smallText}>
                      {" "}
                      H: {weatherData.maxTemp}˚C
                    </Text>
                  </View>
                </View>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <View style={styles.rowViewContainer}>
                <View>
                  <Icon
                    name="sun"
                    type="font-awesome-5"
                    color="#808080"
                    size={30}
                  />
                </View>
                <View style={styles.columnViewContainer}>
                  <View style={styles.smallTextCell}>
                    <Text style={styles.smallText}>
                      {" "}
                      {weatherData.sunrise.substring(11)}
                    </Text>
                  </View>
                  <View style={styles.smallTextCell}>
                    <Text style={styles.smallText}>
                      {" "}
                      {weatherData.sunset.substring(11)}
                    </Text>
                  </View>
                </View>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <View style={styles.rowViewContainer}>
                <Icon
                  name="tint"
                  type="font-awesome-5"
                  color="#808080"
                  size={30}
                />
                <View style={styles.smallTextCell}>
                  <Text style={styles.smallText}>
                    {weatherData.relativeHumidity}%
                  </Text>
                </View>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "80%",
    marginTop: 90,
    marginBottom: 55,
  },
  rowDataTable: {
    padding: 10,
  },
  cell: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  weatherImage: {
    width: 200,
    height: 200,
  },
  columnViewContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  rowViewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: "black",
  },
  subtitle: {
    fontSize: 24,
    color: "black",
  },
  smallText: {
    fontSize: 16,
    color: "black",
  },
  smallTextCell: {
    alignItems: "flex-start",
    paddingLeft: 10,
    justifyContent: "center",
  },
});

export default Weather;
