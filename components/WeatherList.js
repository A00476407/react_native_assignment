import React from "react";
import { View, Text, Image } from "react-native";
import { DataTable } from "react-native-paper";

export const WeatherList = ({ weatherData }) => {
  //console.log("weatherData in List", weatherData.length);

  return (
    <View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 0.2 }}>City Name</DataTable.Title>
            <DataTable.Title style={{ flex: 0.2 }}>Country</DataTable.Title>
            <DataTable.Title style={{ flex: 0.4 }}>Admin1</DataTable.Title>
            <DataTable.Title style={{ flex: 0.1 }}>
              Current Temp.
            </DataTable.Title>
            <DataTable.Title style={{ flex: 0.1 }}>
              Rel. Humidity
            </DataTable.Title>
          </DataTable.Header>
          {weatherData.map((item) => (
            <DataTable.Row key={item.current.temperature_2m}>
              <DataTable.Cell style={{ flex: 0.2 }}>{item.name}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.2 }}>{item.country}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.4 }}>{item.admin1}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.1 }}>{item.current.temperature_2m}˚C</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.1 }}>
                {item.current.relative_humidity_2m}%
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
};
