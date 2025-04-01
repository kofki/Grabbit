import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"



export default function LoadingScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    fontSize: 70,
    fontWeight: "200",
    textAlign: "center",
  },
});