import { Stack } from 'expo-router';

export default function ProfileTab() {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name="index" options={{headerShown: false, title: "Home"}}/>
      <Stack.Screen name="createGroup" options={{headerShown: true, title: "Create Group"}}/>
    </Stack>
  );
}
