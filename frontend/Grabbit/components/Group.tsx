import React, {useEffect, useState} from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '@/firebaseConfig';
import { ref, set, onValue, get } from 'firebase/database';

export default function Group({group}) {
    const [name, setName] = useState('');
    const [members_id, setMembersId] = React.useState<any[]>([]);
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
    }, [])

    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push({pathname: '/(tabs)/home/groupScreen', params: {group: group, groupName: name, members_id: members_id}})} >
            <Text style={{color:'white'}}>{name}</Text>
        </TouchableOpacity>
    );
}