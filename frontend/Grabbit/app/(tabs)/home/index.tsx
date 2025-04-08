import { Image, StyleSheet, Platform, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ItemsList from '@/components/ItemsList';
import { auth } from "@/firebaseConfig";
import { useFocusEffect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {ref, set, get, onValue} from 'firebase/database';
import { db } from '@/firebaseConfig';
import GroupRequests from '@/components/GroupRequests';
import Group  from '@/components/Group';

export default function HomeScreen() {
      const router = useRouter();
      const [needAuth, setNeedAuth] = useState(true);
      const [groups, setGroups] = useState([]);
      const [groupCode, setGroupCode] = useState('');

      const user = auth.currentUser;
      useFocusEffect(() => {
        if(user){
          setNeedAuth(false);
          get(ref(db, 'user_groups/' + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
              setGroups(snapshot.val().group_ids);
            }
            else{
            }
          });
        }
      });

      const handleCreateGroup = () => {
        if (needAuth){
          router.push('/(tabs)/profile/login');
        }
        else{
          router.push('/(tabs)/home/createGroup');
        }
      }

      const handleJoin = () => {
        if (groupCode.length <= 0){
          alert("Please enter a group code");
          return;
        }
        onValue(ref(db, 'groups/' + groupCode), (snapshot) => {
          if (snapshot.exists()) {
            const group = snapshot.val();
            const members = group.members;
            set(ref(db, 'groups/' + groupCode), {
              group_id: groupCode,
              group_name: group.group_name,
              members: [...members, user?.uid]})
        }});
        onValue(ref(db, 'user_groups/' + user?.uid), (snapshot) => {
          if (snapshot.exists()) {
            const group = snapshot.val();
            const group_ids = group.group_ids;
            set(ref(db, 'user_groups/' + user?.uid), {
              "user_id": user?.uid,
              "group_ids": [...group_ids, groupCode]
            })
          }
        })
      }
  return (
    <SafeAreaView>
      <View style={styles.stepContainer}>
        <ThemedText type="title">Grabbit MVP</ThemedText>
      </View>
      {groups.map((group, index) => (
        <View key={index}>
        <Group group={group}/>
        </View>))}
      {groups.length <= 0 && <View style={styles.stepContainer}>
        <ThemedText type="default">No groups found</ThemedText>
        <Button title="Create Group" onPress={handleCreateGroup}/>
        <View>
          <TextInput
          placeholder="Enter Group Code"
          style={{color: 'white'}}
          onChangeText={setGroupCode}
          value={groupCode}
          />
          <Button title="Join Group with Code" onPress={handleJoin}/>
        </View>
        </View>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
