import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const PreOrderScreen = () => {
    const [carMake, setCarMake] = useState('');
    const [carModel, setCarModel] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');

    const handlePreOrder = () => {
        console.log('Submitting pre-order details:', {
            carMake,
            carModel,
            pickupLocation,
            destination
        });
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Pre-Order </Text>
            <TextInput
                style={styles.input}
                placeholder="Pickup Location"
                value={pickupLocation}
                onChangeText={text => setPickupLocation(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Destination"
                value={destination}
                onChangeText={text => setDestination(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Pickup Date"
                value={carMake}
                onChangeText={text => setCarMake(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Pickup Time"
                value={carModel}
                onChangeText={text => setCarModel(text)}

            />
            <View style={{ display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{ borderWidth: 1, width: 150, height: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 10 }}
                >
                    <Text>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ borderWidth: 1, width: 150, height: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 10 }}
                    onPress={handlePreOrder}
                    disabled={!carMake || !carModel || !pickupLocation || !destination}
                >
                    <Text>Submit</Text>
                    {/* <ActivityIndicator color={'#000'} size={'small'} /> */}
                </TouchableOpacity>
            </View>

            {/* <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        color: 'white',
        backgroundColor: '#fff'

    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 60,
        color: 'black'
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 30,
        paddingHorizontal: 10,
        color: 'green',
        backgroundColor: '#fff'
    },
    TextInput: {
        color: 'white'
    }

});

export default PreOrderScreen;
