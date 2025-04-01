import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";


export interface Item {
    id: string;
    text: string;
    completed: boolean;
}

const ItemToBuy = ({ task, onDelete, onToggle }) => {
  return (
    <View style={styles.item}>
        <View style={styles.check}>
        <BouncyCheckbox
            isChecked={task.completed}
            fillColor="green"
            onPress={() => onToggle(task.id)}/>
        <Text style={task.completed ? styles.completed : {color: 'white'}}>{task.text}</Text>
        </View>
        <Text style={{color: 'white'}}>$100.00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
  },
  check:{
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'grey'
  }
});

export default ItemToBuy;