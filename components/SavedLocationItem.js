import { StyleSheet, View, Text, Pressable } from "react-native";

export const SavedLocationItem = ({ onDeleteItem, id, text }) => {
  return (
    <Pressable
      onPress={() => onDeleteItem(id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.todoContainer}>
        <Text style={styles.todoText}>{text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    margin: 8,
    borderRadius: 6,
    padding: 4,
    paddingVertical: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  todoText: {
    padding: 8,
  },
});