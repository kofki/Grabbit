import { View, Button, StyleSheet, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ItemsList from "./ItemsList";
import { useState } from "react";
import {db} from "@/firebaseConfig";
import {ref, onValue, get, push, set} from "firebase/database";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";

export default function GroupRequests({friends}) {
    const router = useRouter();

    const [items, setItems] = useState([]);

    const handleRequest = () => {
        const requestsRef = ref(db, 'buy_requests');
        const newRequestRef = push(requestsRef);

        set(newRequestRef, {
            date: new Date().toISOString(),
            items: items,
            group_id: newRequestRef.key,
            requestor: auth.currentUser?.uid,
        })

        router.dismissAll();
    }

    return (
        <View>
<View style={styles.stepContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ThemedText type="default">Friends in Group:</ThemedText>
          {friends.map((friend, index) => (
              <ThemedText type="default" key={index}>{friend}</ThemedText>
          ))}
          <Button title="Add Friends"/>
        </View>
        <Button title="Add Item"/>
      </View>
        <View style={styles.stepContainer}>
        <ItemsList item={items} setItems={setItems}/>
        <Button title="Request" onPress={handleRequest}/>
        </View>
        </View>
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
