import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { markerId } = route.params || {};
  const [bookingPrice, setBookingPrice] = useState(0);
  const [coins, setCoins] = useState(0); // Initialize to 0, will be loaded from AsyncStorage

  const markerNames = {
    1: 'Driver Mensah',
    2: 'Driver Kofi',
    3: 'Driver Yaw',
  };

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const storedCoins = await AsyncStorage.getItem('coins');
        if (storedCoins !== null) {
          setCoins(parseInt(storedCoins, 10));
        } else {
          setCoins(1000); // Default initial coins
        }
      } catch (error) {
        console.error('Failed to load coins:', error);
      }
    };

    loadCoins();

    if (!markerId) {
      Alert.alert(
        'No Ride Selected',
        'Please select a ride to access the payment screen.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } else {
      // Generate a random price between 11 and 50 coins
      const price = Math.floor(Math.random() * (50 - 11 + 1)) + 11;
      setBookingPrice(price);
    }
  }, [markerId]);

  const handleConfirm = async () => {
    const updatedCoins = coins - bookingPrice;
    setCoins(updatedCoins);
    try {
      await AsyncStorage.setItem('coins', updatedCoins.toString());
    } catch (error) {
      console.error('Failed to save coins:', error);
    }
    // Move the marker to the user's exact location and navigate back to Home
    navigation.navigate('Home', { markerId, action: 'moveMarkerToUserLocation' });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {markerId && (
        <>
          <View style={styles.coinContainer}>
            <Image source={require('../assets/coins.png')} style={styles.coinImage} />
            <Text style={styles.coinText}>{coins} coins</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.markerName}>{markerNames[markerId]}</Text>
            <Text style={styles.bookingPrice}>Booking Price: {bookingPrice} coins</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  coinContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  coinText: {
    fontSize: 20,
    marginLeft: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 50,
  },
  markerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingPrice: {
    fontSize: 20,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PaymentScreen;
