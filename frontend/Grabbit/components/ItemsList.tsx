import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import ItemToBuy, {Item} from './ItemtoBuy';
import BouncyCheckbox from "react-native-bouncy-checkbox";



const ItemsList = ({item, setItems}) => {
  const [text, setText] = useState('');

  const addTask = () => {
    if (text.trim() !== '') {
      setItems([...item, { id: new Date().toISOString(), text, completed: false }]);
      setText('');
    }
  };

  const deleteTask = (id: string) => {
    setItems(item.filter(task => task.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setItems(item.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View>
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <ItemToBuy
            task={item}
            onDelete={deleteTask}
            onToggle={toggleCompleted}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
        <TextInput
            placeholder="Add Item..."
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTask}
            style={{ color: 'white'}}
        />
      </View>
    </View>
  );
};

export default ItemsList;