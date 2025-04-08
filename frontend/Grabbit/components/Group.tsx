import React, {useEffect, useState} from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '@/firebaseConfig';
import { ref, set, onValue, get } from 'firebase/database';

export default function Group({group}) {
    const [name, setName] = useState('');
    const [members_id, setMembersId] = React.useState<any[]>([]);
    const [pay_due, setPayDue] = React.useState(false);
    useEffect(() => {
        const groupNameRef = ref(db, 'groups/' + group +'/group_name');
        onValue(groupNameRef, (snapshot) => {
            if (snapshot.exists()) {
                setName(snapshot.val());
            }
        })
        const membersRef = ref(db, 'groups/' + group + '/members');
                onValue(membersRef, (snapshot) => {
                    if (snapshot.exists()) {
                        setMembersId(snapshot.val());
                    }
                })
        const transactionsRef = ref(db, 'transactions/' + group+ '/transaction_id');
        onValue(transactionsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const filtered = Object.entries(data).filter(([key, tx]) => tx.members === auth.currentUser?.uid && tx[auth.currentUser?.uid].status === 'complete')
                .map(([key, tx]) => ({id: key,  ...tx}));
                setPayDue(filtered.length > 0);
            }   
        })
        
    }, [])

    const router = useRouter();
    return (
        <View style={{flex: 1, backgroundColor: '#18191A', borderRadius: 5, marginLeft: 10, marginRight: 10}}>
            { pay_due && <TouchableOpacity style={{backgroundColor: 'green', height: 30, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => router.push({pathname: '/(tabs)/home/groupScreen', params: {group: group, groupName: name, members_id: members_id}})} >
                <Text style={{color:'white', paddingLeft: 15, paddingTop: 5, fontSize: 14}}>Order is Complete!</Text>
                <Button title="Pay Now"/>
            </TouchableOpacity>}
        <TouchableOpacity style={{backgroundColor: '#242526', height: 100, borderRadius: 5}} onPress={() => router.push({pathname: '/(tabs)/home/groupScreen', params: {group: group, groupName: name, members_id: members_id}})} >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                <Text style={{color:'white', paddingLeft: 15, paddingTop: 10, fontSize: 18}}>{name}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', bottom: 0, position: 'absolute'}}>
            <Button title="Request Items" onPress={() => router.push({pathname: '/(tabs)/home/groupScreen', params: {group: group, groupName: name, members_id: members_id}})} />
            <Button title="Group Payment" onPress={() => router.push({pathname: '/(tabs)/home/buyerScreen', params: {group: group, groupName: name, members_id: members_id}})} />
            
            </View> 
            </TouchableOpacity>
        </View>
    );
}