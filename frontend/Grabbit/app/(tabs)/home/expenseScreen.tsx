import React, {useState} from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Expense() {
    const [expense, setExpense] = useState("");
    const router = useRouter();

    const handleEvenSplit = () => {
        Alert.alert("Even split selected", "You have selected to split the expense equally among all members.");
        router.dismissAll()
    }

    const handleCustomSplit = () => {

    }

    return (
        <View>
            <Text style={{color: 'white'}}>Expense</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: 'white'}}>$</Text>
                <TextInput
                    style={{color: 'white'}}
                    keyboardType="numeric"
                    placeholder="00.00"
                    value={expense}
                    onChangeText={setExpense}
                />
            </View>
            <Text style={{color: 'white'}}>Split</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button title="Equally" onPress={() => handleEvenSplit()} />
            </View>
        </View>
    );
}