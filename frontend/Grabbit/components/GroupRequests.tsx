import { View, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ItemsList from "./ItemsList";
import { StyleSheet } from "react-native";

export default function GroupRequests(groups:any) {
    return (
        <View>
<View style={styles.stepContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ThemedText type="default">Friends in Group:</ThemedText>
          <Button title="Add Friends"/>
        </View>
        <Button title="Add Item"/>
      </View>

        <View style={styles.stepContainer}>
        <ItemsList/>
        </View>
    <Button title="Pay"/>
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
