import React from 'react';
import { Button, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function PaymentConfirm() {
    const router = useRouter();
    return (
        <View>
            <Text>Payment Confirm</Text>
            <Button title="Confirm" onPress={() => router.replace('/(tabs)/home')} />
        </View>
    );
}