import * as Location from 'expo-location';

export const getCurrentCountry = async () => {
    let { coords } = await Location.getCurrentPositionAsync({});
    let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
    });

    return reverseGeocode[0]?.country || '';
};
