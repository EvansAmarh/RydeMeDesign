// components/CustomDrawerContent.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://example.com/profile-pic.jpg' }} // Replace with actual profile picture URL
                    style={styles.profilePic}
                />
                <Text style={styles.username}>John Doe</Text>
            </View>
            <DrawerItem
                label="Special Delivery"
                onPress={() => props.navigation.navigate('Special Delivery')}
            />
            <DrawerItem
                label="Sign Out"
                onPress={() => alert('Sign Out Pressed')}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    username: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;
