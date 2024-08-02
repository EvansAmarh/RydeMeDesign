import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Image, Modal, Text, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Dialog from 'react-native-dialog';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import { AirbnbRating } from 'react-native-ratings';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBlvRHD2qJcFpjbd5j8gwqlCEeQaGzQAzM';

const HomeScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [locationEnabled, setLocationEnabled] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(true);
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });
    const [location, setLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [markers, setMarkers] = useState([
        { id: 1, distance: 3, image: require('../assets/vehicle.png'), title: 'Driver Mensah' },
        { id: 2, distance: 20, image: require('../assets/vehicle2.png'), title: 'Driver Kofi' },
        { id: 3, distance: 1, image: require('../assets/vehicle3.png'), title: 'Driver Yaw' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [movingMarker, setMovingMarker] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    useEffect(() => {
        let locationSubscription;

        const startWatchingLocation = async () => {
            try {
                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 5000,
                        distanceInterval: 1,
                    },
                    (location) => {
                        setLocation(location.coords);
                        setRegion(prevRegion => ({
                            ...prevRegion,
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }));
                    }
                );
            } catch (error) {
                console.error('Error watching location:', error);
                Alert.alert('Error', 'Could not start watching location');
            }
        };

        if (locationEnabled) {
            startWatchingLocation();
        }

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, [locationEnabled]);

    useEffect(() => {
        if (route.params?.location) {
            const { latitude, longitude } = route.params.location;
            if (latitude && longitude) {
                const dest = {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                };
                setDestination(dest);
            } else {
                Alert.alert('Error', 'Invalid destination coordinates');
            }
        }
    }, [route.params?.location, location]);

    useEffect(() => {
        if (route.params?.markerId && route.params?.action === 'moveMarkerToUserLocation') {
            moveMarkerToUserLocation(route.params.markerId);
        }
    }, [route.params]);

    const checkLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setLocationEnabled(status === 'granted');
            if (status === 'granted') {
                getCurrentLocation();
            } else {
                Alert.alert('Location permission not granted');
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
            Alert.alert('Error', 'Could not check location permission');
        }
    };

    const getCurrentLocation = async () => {
        try {
            let { coords } = await Location.getCurrentPositionAsync({});
            setLocation(coords);
            setRegion(prevRegion => ({
                ...prevRegion,
                latitude: coords.latitude,
                longitude: coords.longitude,
            }));
            updateMarkerCoordinates(coords);
        } catch (error) {
            console.error('Error getting current location:', error);
            Alert.alert('Error', 'Could not get current location');
        }
    };

    const moveMarkerToUserLocation = (markerId) => {
        if (location) {
            setMarkers((prevMarkers) =>
                prevMarkers.map((marker) =>
                    marker.id === markerId
                        ? { ...marker, latitude: location.latitude, longitude: location.longitude }
                        : marker
                )
            );
            setMovingMarker(markerId);
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                moveMarkerAlongRoute(markerId);
            }, 3000);
        } else {
            Alert.alert('Error', 'User location is not available');
        }
    };

    const moveMarkerAlongRoute = (markerId) => {
        if (routeCoordinates.length > 0) {
            let index = 0;
            const interval = setInterval(() => {
                if (index < routeCoordinates.length) {
                    setMarkers((prevMarkers) =>
                        prevMarkers.map((marker) =>
                            marker.id === markerId
                                ? { ...marker, latitude: routeCoordinates[index].latitude, longitude: routeCoordinates[index].longitude }
                                : marker
                        )
                    );
                    index += 1;
                } else {
                    clearInterval(interval);
                    setRatingModalVisible(true);
                }
            }, 1000);
        }
    };

    const updateMarkerCoordinates = (currentLocation) => {
        setMarkers((prevMarkers) =>
            prevMarkers.map((marker) => {
                const coordinates = calculateMarkerCoordinates(marker.distance, currentLocation);
                return coordinates ? { ...marker, ...coordinates } : marker;
            })
        );
    };

    const handleEnableLocation = async () => {
        setDialogVisible(false);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setLocationEnabled(status === 'granted');
            if (status === 'granted') {
                getCurrentLocation();
            } else {
                Alert.alert('Location permission not granted');
            }
        } catch (error) {
            console.error('Error enabling location:', error);
            Alert.alert('Error', 'Could not enable location');
        }
    };

    const handleCancel = () => {
        setDialogVisible(false);
        Alert.alert('Location is required for the app to function properly.');
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        if (query.length > 2) {
            navigation.navigate('SearchResults', { query });
        }
    };

    const handleMarkerPress = (marker) => {
        if (destination) {
            navigation.navigate('Payments', { markerId: marker.id });
        } else {
            Alert.alert('Alert', 'Please search for a destination first.');
        }
    };

    const calculateMarkerCoordinates = (distance, currentLocation) => {
        if (!currentLocation) return null;

        const earthRadius = 6371; // Earth radius in kilometers
        const bearing = Math.random() * 360; // Random bearing in degrees
        const bearingRad = (bearing * Math.PI) / 180; // Convert bearing to radians

        const latitude = currentLocation.latitude;
        const longitude = currentLocation.longitude;

        const newLat = latitude + (distance / earthRadius) * (180 / Math.PI);
        const newLng = longitude + (distance / earthRadius) * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);

        return {
            latitude: newLat,
            longitude: newLng,
        };
    };

    const handleRatingSubmit = () => {
        Alert.alert('Thank you for your rating!');
        setRatingModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                {locationEnabled && location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="You are here"
                    />
                )}
                {markers.map((marker) => (
                    marker.latitude && marker.longitude && (
                        <Marker
                            key={marker.id}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                            onPress={() => handleMarkerPress(marker)}
                        >
                            <Image source={marker.image} style={styles.markerImage} />
                        </Marker>
                    )
                ))}
                {destination && (
                    <>
                        <Marker
                            coordinate={destination}
                            title="Destination"
                            pinColor="blue"
                        />
                        {location && (
                            <MapViewDirections
                                origin={location}
                                destination={destination}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={3}
                                strokeColor="blue"
                                onReady={(result) => {
                                    console.log(`Distance: ${result.distance} km`);
                                    console.log(`Duration: ${result.duration} min.`);
                                    setRouteCoordinates(result.coordinates);
                                }}
                                onError={(errorMessage) => {
                                    console.error('Error getting directions:', errorMessage);
                                }}
                            />
                        )}
                    </>
                )}
            </MapView>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Where to?"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                />
            </View>

            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>For a better experience, turn on device location</Dialog.Title>
                <Dialog.Description>
                    This uses Google's location service.
                </Dialog.Description>
                <Dialog.Button label="No thanks" onPress={handleCancel} />
                <Dialog.Button label="OK" onPress={handleEnableLocation} />
            </Dialog.Container>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>The {movingMarker && markers.find(marker => marker.id === movingMarker)?.title} has arrived!</Text>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={ratingModalVisible}
                onRequestClose={() => {
                    setRatingModalVisible(!ratingModalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Your goods have arrived! Rate your service with {movingMarker && markers.find(marker => marker.id === movingMarker)?.title}.</Text>
                    <AirbnbRating
                        count={5}
                        reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                        defaultRating={0}
                        size={20}
                        onFinishRating={(rating) => setRating(rating)}
                    />
                    <Pressable
                        style={styles.submitButton}
                        onPress={handleRatingSubmit}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </Pressable>
                </View>
            </Modal>
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
    searchContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: '#273b4a',
        borderRadius: 5,
        borderColor: '#273b4a',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderWidth: 5
    },
    searchInput: {
        flex: 1,
        padding: 10,
        borderColor: '#273b4a',
        borderWidth: 1,
        borderRadius: 5,
    },
    markerImage: {
        width: 30,
        height: 30,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalText: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default HomeScreen;
