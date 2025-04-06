import React from 'react';
import { Text, View, FlatList } from 'react-native';
import ItemToBuy from './ItemToBuy';

export default function ItemsToBuyList({ items }) {
    return (
        <View>
          {items.map((transaction, index) => (
          <FlatList
          key={index}
          data={transaction.items}
          renderItem={({ item }) => (
            <ItemToBuy
              task={item}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />))
}
        </View>
    );
}