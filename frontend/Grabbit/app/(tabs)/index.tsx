import { Image, StyleSheet, Platform, Text, View, SafeAreaView, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ItemsList from '@/components/ItemsList';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.stepContainer}>
        <ThemedText type="title">Grabbit MVP</ThemedText>
      </View>
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
