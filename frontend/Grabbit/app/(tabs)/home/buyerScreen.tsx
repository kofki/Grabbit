import React, { useCallback, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { db } from '@/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import GroupRequests from '@/components/GroupRequests';
import FriendsGroup from '@/components/FriendsGroup';
import ItemsToBuyList from '@/components/ItemsToBuyList';


export default function BuyerScreen() {
    const router = useRouter();
    const { group, groupName, members_id: rawMembersId } = useLocalSearchParams<{group: string, groupName: string, members_id: string | string[]}>();
    const members_id = Array.isArray(rawMembersId) ? rawMembersId : [rawMembersId];
    const [members_name, setMembersName] = React.useState<any[]>([]);
    const [items, setItems] = React.useState<any[]>([]);

    useFocusEffect(useCallback(() => {
        for (let i = 0; i < members_id.length; i++) {
        const memberNameRef = ref(db, 'users/' + members_id[i] + '/username');
        onValue(memberNameRef, (snapshot) => {
            if (snapshot.exists()) {
                setMembersName((prev) => [...prev, snapshot.val()]);
            }
        })
    }
        return () => {
        }

    }, []))

    useEffect(() => {
        onValue(ref(db, 'buy_requests/' + group), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const filtered = Object.entries(data).filter(([key, tx]) => !tx.completed)
                .map(([key, tx]) => ({id: key,  ...tx}));
                setItems(filtered);
            }
        })
    },[])
    return (
        <View>
            <FriendsGroup friends={members_name}/>
            <ItemsToBuyList items={items}/>
            <Button title="Split the bill" onPress={()=>router.push("/(tabs)/home/expenseScreen")}/>
        </View>
    );
}