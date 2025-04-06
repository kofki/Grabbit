import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";


export interface Item {
    text: string;
    price: number;
    completed: boolean;
}

const ItemRequest = ({ task, onDelete, price }) => {
  return (
    <View style={styles.item}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => onDelete(task.id)}>
            <Text style={{color: 'grey', fontWeight:'bold', paddingRight: 10, fontSize: 18}}>x</Text>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 18}}>{task.text}</Text>
        </View>
        <Text style={{color: 'white'}}>${task.price ? task.price : "--.--"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderColor: 'dark_gray',
    borderBottomWidth: 2,
    borderRadius: 5,
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default ItemRequest;