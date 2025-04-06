import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ItemRequest, {Item} from './ItemRequest';



const ItemsList = ({item, setItems}) => {
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');

  const addTask = () => {
    if (text.trim() !== '') {
      if (parseFloat(price) > 0) {
      setItems([...item, { id: new Date().toISOString(), text, completed: false, price: parseFloat(price)}]);
      } else{
        setItems([...item, { id: new Date().toISOString(), text, completed: false, price: null}]);
      }
      setText('');
      setPrice('');
    }
  };

  const deleteTask = (id: string) => {
    setItems(item.filter(task => task.id !== id));
  };


  return (
    <View>
      {item.map((transaction, index) => (
        <ItemRequest
        task={transaction}
        onDelete={deleteTask}
        price={transaction.price}
      />
      ))}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TextInput
            placeholder="Add Item..."
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTask}
            style={{ color: 'white'}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={{color: 'white'}}>$</Text>
          <TextInput
            keyboardType='numeric'
            placeholder="00.00"
              value={price}
              onChangeText={setPrice}
              style={{ color: 'white'}}
          />
        </View>
      </View>
    </View>
  );
};

export default ItemsList;