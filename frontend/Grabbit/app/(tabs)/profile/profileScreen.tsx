import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ProfileScreen(){
    const router = useRouter();
    return (
        <SafeAreaView>
            <Text style={{color: 'white'}}>Profile</Text>
            <Button title="login" onPress={() => router.push('./login')}/>
            <Button title="register" onPress={() => router.push('./register')}/>
        </SafeAreaView>
    );
}