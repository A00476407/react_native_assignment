import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../stylesheets/stylesheet";
import { DataTable } from "react-native-paper";
import data from "./WeatherCodeDescriptions.json";
import { Icon } from "@rneui/themed";

const Weather = ({ weatherData }) => {
  return (
    <View style={styles.weatherContainer}>
      <View>
        <DataTable>
          <DataTable.Row style={{borderBottomWidth: 0, height: 100}}>
            <DataTable.Cell style={styles.cellDataTable}>
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
                  <View style={styles.cellDataTable}>
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
            <DataTable.Cell style={styles.cellDataTable}>
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
            <DataTable.Cell style={styles.cellDataTable}>
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
                    <Icon
                      name="caret-up"
                      type="font-awesome-5"
                      color="#808080"
                      size={20}
                    />
                    <Text style={styles.smallText}>
                      {" "}
                      {weatherData.sunrise.substring(11)}
                    </Text>
                  </View>
                  <View style={styles.smallTextCell}>
                    <Icon
                      name="caret-down"
                      type="font-awesome-5"
                      color="#808080"
                      size={20}
                    />
                    <Text style={styles.smallText}>
                      {" "}
                      {weatherData.sunset.substring(11)}
                    </Text>
                  </View>
                </View>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cellDataTable}>
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

export default Weather;
