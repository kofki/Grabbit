import React from 'react';
import { Text, View } from 'react-native';

import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ItemToBuy({ task }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <BouncyCheckbox
                isChecked={task.completed}
                fillColor="green"
                onPress={() => {}}/>
            <Text style={{color: 'white'}}>{task.text}</Text>
            <Text style={{color: 'white'}}>${task.price}</Text>
        </View>
    );
}