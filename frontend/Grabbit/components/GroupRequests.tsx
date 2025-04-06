import { View, Button, StyleSheet, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ItemsList from "./ItemsList";
import { useState } from "react";
import {db} from "@/firebaseConfig";
import {ref, onValue, get, push, set} from "firebase/database";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import FriendsGroup from "./FriendsGroup";

export default function GroupRequests({friends, group_id}) {
    const router = useRouter();

    const [items, setItems] = useState([]);

    const handleRequest = () => {
      if (items.length <= 0){alert("Please add at least one item"); return;}
        const requestsRef = ref(db, 'buy_requests/'+ group_id + '/');
        const newRequestRef = push(requestsRef);

        set(newRequestRef, {
            date: new Date().toISOString(),
            items: items,
            completed: false,
            requestor: auth.currentUser?.uid,
        })

        router.dismissAll();
    }

    return (
        <View>
          <FriendsGroup friends={friends}/>
          <View style={styles.stepContainer}>
          </View>
          <View style={styles.container}>
            <ItemsList item={items} setItems={setItems}/>
            <Button title="Request Items" onPress={handleRequest}/>
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
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: '#242526',
    margin: 5,
    borderRadius: 10,
  }
});
