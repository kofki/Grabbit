import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";

export default function ProfileScreen(){
    const router = useRouter();
    const [needAuth, setNeedAuth] = useState(true);
    
    const user = auth.currentUser;
    useFocusEffect(() => {
        if(user){
            setNeedAuth(false);
        }
    })
    
    

    return (
        <SafeAreaView>
            <Text style={{color: 'white'}}>Profile</Text>
            {needAuth && <Button title="login" onPress={() => router.push('./login')}/>}
            {needAuth && <Button title="register" onPress={() => router.push('./register')}/>}
            {!needAuth && <Text style={{color: "white"}}>{user?.email}</Text>}
            {!needAuth && <Button title="logout" onPress={() => {auth.signOut(); router.replace("/(tabs)/home")}}/>}

        </SafeAreaView>
    );
}