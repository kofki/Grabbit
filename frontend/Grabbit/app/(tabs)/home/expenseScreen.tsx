import React, {useState} from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import {auth, db} from '@/firebaseConfig';
import { ref, set, push, onValue } from 'firebase/database';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LocalRouteParamsContext } from 'expo-router/build/Route';

export default function Expense() {
    const [expense, setExpense] = useState("");
    const router = useRouter();

    const { group, members_id: rawMembersId } = useLocalSearchParams<{group: string, members_id: string | string[]}>();
        const members_id = Array.isArray(rawMembersId) ? rawMembersId : [rawMembersId];

    const handleEvenSplit = () => {
    
        if (parseFloat(expense) <= 0 || isNaN(parseFloat(expense))) {
            Alert.alert("Error", "Please enter a valid expense amount.");
            return
        }
        const transactionRef = ref(db, 'transactions/' + group+ '/transaction_id');
        const newTransactionRef = push(transactionRef);
        const splitAmount = parseFloat(expense) / members_id.length;
        members_id.map((member_id) => { if (member_id !== auth.currentUser?.uid) {
            set(ref(db, 'transactions/' + group + '/transaction_id/' + newTransactionRef.key + '/members/' + member_id), {
                "amount": splitAmount,
                "user_to_pay": auth.currentUser?.uid,
                "date": new Date().toISOString(),
                "status": "incpmplete",
            })
        }
        
        })

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