import React, { useState } from "react";
import { Pressable, SafeAreaView, View, Text, StyleSheet, TextInput, Keyboard, Alert } from "react-native";

import { CTAButton } from "@/components/CTAButton";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { db } from "@/firebaseConfig";
import { set, ref } from "firebase/database";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();


    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, "users/" + user.uid), {
                    user_id: user.uid,
                    username: name,
                    email: email,
                    profile_picture: "https://example.com/profile.jpg"
                });
                router.replace("./(tabs)/profile");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Error", "Wrong email or password");
            });
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
                            style={{color: "white"}}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={{color: "white"}}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={{color: "white"}}
                        />
                    </View>
                    <CTAButton 
                        title="Sign Up"
                        onPress={handleRegister}
                        variant="primary"
                    />
                    <CTAButton
                        title="Go Back"
                        onPress={() => {router.replace("./(tabs)")}}
                        variant="secondary"
                    />
                </View>
            </SafeAreaView>
        </Pressable>
    );

}
