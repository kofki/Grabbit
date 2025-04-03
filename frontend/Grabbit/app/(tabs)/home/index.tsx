import { Image, StyleSheet, Platform, Text, View, SafeAreaView, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ItemsList from '@/components/ItemsList';
import { auth } from "@/firebaseConfig";
import { useFocusEffect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {ref, set, get} from 'firebase/database';
import { db } from '@/firebaseConfig';
import GroupRequests from '@/components/GroupRequests';

export default function HomeScreen() {
      const router = useRouter();
      const [needAuth, setNeedAuth] = useState(true);
      const [groups, setGroups] = useState([]);

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
  return (
    <SafeAreaView>
      <View style={styles.stepContainer}>
        <ThemedText type="title">Grabbit MVP</ThemedText>
      </View>
      {groups.length > 0 && GroupRequests(groups)}
      {groups.length <= 0 && <View style={styles.stepContainer}>
        <ThemedText type="default">No groups found</ThemedText>
        <Button title="Create Group" onPress={handleCreateGroup}/>
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
