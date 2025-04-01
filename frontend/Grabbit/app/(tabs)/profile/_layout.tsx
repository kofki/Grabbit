import { Stack } from 'expo-router';

export default function ProfileTab() {
  return (
    <Stack>
      <Stack.Screen name="profileScreen" options={{headerShown: false, title: "Profile"}}/>
      <Stack.Screen name="login" />
      <Stack.Screen name="register"/>
    </Stack>
  );
}
