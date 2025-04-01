import React, { useState } from "react";
import { Pressable, SafeAreaView, View, Text, StyleSheet, TextInput, Keyboard, Alert } from "react-native";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { CTAButton } from "@/components/CTAButton";
import { useRouter } from "expo-router";

export default function Register() {
    const [name, setName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const router = useRouter();

    const createProfile = async (response: any) =>{

    }

    const handleRegister = async () => {
        if (email && password){
            try {
                const response = await auth().createUserWithEmailAndPassword(email, password);
                if (response.user){
                    await createProfile(response);
                    router.push("../index");
                }
            } catch (error) {
                Alert.alert("Error", "Failed to create account. Please try again.");
            }
        }
    };

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <View>
                    <View>
                        <Text>Register</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <CTAButton 
                        title="Sign Up"
                        onPress={()=>{}}
                        variant="primary"
                    />
                    <CTAButton
                        title="Go Back"
                        onPress={() => {}}
                        variant="secondary"
                    />
                </View>
            </SafeAreaView>
        </Pressable>
    );

}
