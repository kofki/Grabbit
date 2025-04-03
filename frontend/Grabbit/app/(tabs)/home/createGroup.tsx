import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '@/firebaseConfig';
import { db } from '@/firebaseConfig';
import { ref, set, push } from 'firebase/database';

export default function CreateGroup() {
    const router = useRouter();
    const [groupName, setGroupName] = useState('');


    const handleCreate = () => {
        const groupsListRef = ref(db, 'groups');

        // Generate a unique ID
        const newGroupRef = push(groupsListRef);
        
        // Create the data you want to store
        set(newGroupRef, {
            group_id: newGroupRef.key,
            group_name: groupName
        })

        set(ref(db, 'user_groups/' + auth.currentUser?.uid), {
            "user_id": auth.currentUser?.uid,
            "group_ids": [newGroupRef.key]
        })
    }


    return (
        <SafeAreaView>
            <Text style={{color: 'white'}}>Create Group</Text>
            <TextInput 
            placeholder="Enter a Group Name"
            value={groupName}
            style={{color: 'white'}}
            onChangeText={setGroupName}
            />
            <Button title="Create" onPress={handleCreate}/>
        </SafeAreaView>
    );
}