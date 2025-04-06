import { Stack } from 'expo-router';

export default function ProfileTab() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false, title: "Home"}}/>
      <Stack.Screen name="createGroup" options={{headerShown: true, title: "Create Group"}}/>
      <Stack.Screen name="groupScreen" options={{headerShown: true, title: "Group"}}/>
      <Stack.Screen name="buyerScreen" options={{headerShown: true, title: "Group"}}/>
      <Stack.Screen name="expenseScreen" options={{headerShown: true, title: "Payment"}}/>
    </Stack>
  );
}
