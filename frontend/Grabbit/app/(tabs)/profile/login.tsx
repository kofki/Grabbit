import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import { CTAButton } from "@/components/CTAButton";

import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import {useRouter} from "expo-router";
import { onAuthStateChanged } from "@react-native-firebase/auth";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();


  const goToRegistration = () => {
    router.push("/profile/register");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    router.replace("/profile/profileScreen");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };


  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Grabbit</Text>
          </View>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <CTAButton title="Login" onPress={handleLogin} variant="primary" />
          <CTAButton
            title="Sign Up"
            onPress={goToRegistration}
            variant="secondary"
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "white",
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "200",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
  },
});