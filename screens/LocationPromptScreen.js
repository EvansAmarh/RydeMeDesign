// screens/LocationPromptScreen.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Dialog from 'react-native-dialog';

const LocationPromptScreen = ({ navigation }) => {
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(true);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    const checkLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setLocationEnabled(status === 'granted');
    };

    const handleEnableLocation = async () => {
        setDialogVisible(false);
        let { status } = await Location.requestForegroundPermissionsAsync();
        setLocationEnabled(status === 'granted');
        if (status !== 'granted') {
            Alert.alert('Location permission not granted');
        }
    };

    const handleCancel = () => {
        setDialogVisible(false);
        Alert.alert('Location is required for the app to function properly.');
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            />
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>For a better experience, turn on device location</Dialog.Title>
                <Dialog.Description>
                    This uses Google's location service.
                </Dialog.Description>
                <Dialog.Button label="No thanks" onPress={handleCancel} />
                <Dialog.Button label="OK" onPress={handleEnableLocation} />
            </Dialog.Container>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default LocationPromptScreen;
