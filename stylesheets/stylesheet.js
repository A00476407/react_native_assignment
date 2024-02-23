import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherContainer: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
  },
  weatherImage: {
    width: 200,
    height: 200,
  },
  rowDataTable: {
    padding: 30,
    borderBottomWidth: 0,
  },
  cellDataTable: {
    justifyContent: "center",
    paddingLeft: 10,
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
  subtitle: {
    fontSize: 24,
    color: "black",
  },
  smallText: {
    fontSize: 16,
    color: "black",
  },
  smallTextCell: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 10,
    justifyContent: "center",
  },
});
