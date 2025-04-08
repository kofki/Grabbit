import React from 'react';
import { Button, Text, View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function FriendsGroup({friends}) {
    return(
        <View>
            <View style={{alignItems: 'flex-end'}}>
                <Button title="Add Friends" onPress={()=>{}}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ThemedText type="default">Friends in Group: </ThemedText>
            {friends.map((friend: string, index) => (
                <ThemedText type="default" key={index}>{friend}</ThemedText>
            ))}
            </View>
        </View>
    )
}