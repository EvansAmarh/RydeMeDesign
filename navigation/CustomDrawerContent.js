import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const defaultAvatar = require('../assets/rename-removebg-preview.png');

const CustomDrawerContent = (props) => {
    const { username } = props;

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.profileContainer}>
                <Image source={defaultAvatar} style={styles.avatar} />
                <Text style={styles.username}>{username || 'Guest'}</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
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
